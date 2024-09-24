import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PgService } from "@postgres";
import { ICreateRentalRequest } from "./interfaces/create-rental.interface";
import { IUpdateRentalRequest } from "./interfaces/update-rental.interface";

@Injectable()
export class RentalService {
    constructor(private readonly pgService: PgService) { }

    create = async (rentalInterface: ICreateRentalRequest): Promise<any> => {
        try {
            const car = await this.pgService.fetchData(`SELECT * FROM Car WHERE id = ${rentalInterface.car_id}`)
            const customer = await this.pgService.fetchData(`SELECT * FROM Customer WHERE id = ${rentalInterface.customer_id}`)

            if(!(car&&customer)){
                throw new BadRequestException('Car or Customer not found')
            }
            const result = await this.pgService.fetchData(`INSERT INTO Rental (car_id,customer_id,start_date,end_date)  
                VALUES ($1, $2, $3, $4) RETURNING *`,
                rentalInterface.car_id,
                rentalInterface.customer_id,
                rentalInterface.start_date,
                rentalInterface.end_date
            );

            return result[0];
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }

    }

    getAll = async (): Promise<any> => {
        try {
            return await this.pgService.fetchData('SELECT * FROM Rental')
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }
    }

    update = async (id: number, rentalInterface: IUpdateRentalRequest): Promise<any> => {
        try {

            const car = await this.pgService.fetchData(`SELECT * FROM Car WHERE id = ${rentalInterface.car_id}`)
            const customer = await this.pgService.fetchData(`SELECT * FROM Customer WHERE id = ${rentalInterface.customer_id}`)

            if(!(car&&customer)){
                throw new BadRequestException('Car or Customer not found')
            }

            await this.pgService.fetchData(`UPDATE Rental SET car_id = $1, customer_id =  $2, start_date = $3, end_date = $4 WHERE id = $5`,
                rentalInterface.car_id,
                rentalInterface.customer_id,
                rentalInterface.start_date,
                rentalInterface.end_date,
                id
            )

            return {
                message: 'Rental Updated'
            }
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }
    }

    delete = async (id: number): Promise<any> => {
        try {
            await this.pgService.fetchData(`DELETE FROM Rental WHERE id = $1`,
                id)

            return {
                message: 'Rental Deleted'
            }
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }
    }

}