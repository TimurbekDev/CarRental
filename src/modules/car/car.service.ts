import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PgService } from "src/pg";
import { ICreateCarRequest } from "./interfaces/create-car.interface";
import { IUpdateCarRequest } from "./interfaces/update-car.interface";

@Injectable()
export class CarService {
    constructor(private readonly pgService: PgService) { }

    create = async (carInterface: ICreateCarRequest): Promise<any> => {
        try {
            const result = await this.pgService.fetchData(`INSERT INTO Car (model, daily_price, fuel_type, is_available)  
            VALUES ($1, $2, $3, $4) RETURNING *`,
                carInterface?.model,
                carInterface?.daily_price,
                carInterface?.fuel_type,
                carInterface?.is_available || true
            );

            return result[0];
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }

    }

    getAll = async (): Promise<any> => {
        try {
            return await this.pgService.fetchData('SELECT * FROM car')
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }
    }

    update = async (id: number, carInterface: IUpdateCarRequest): Promise<any> => {
        try {
            await this.pgService.fetchData(`UPDATE Car SET model = $1, daily_price =  $2, fuel_type = $3, is_available = $4 WHERE id = $5`,
                carInterface?.model,
                carInterface?.daily_price,
                carInterface?.fuel_type,
                carInterface?.is_available || true,
                id
            )

            return {
                message: 'Car Updated'
            }
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }
    }

    delete = async (id: number): Promise<any> => {
        try {
            await this.pgService.fetchData(`DELETE FROM Car WHERE id = $1`,
                id)

            return {
                message: 'Car Deleted'
            }
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }
    }

}