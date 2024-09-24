import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PgService } from "@postgres";
import { ICreateCustomerRequest } from "./interfaces/create-customer.interface";
import { IUpdateCustomerRequest } from "./interfaces/update-customer.interface";

@Injectable()
export class CustomerService {
    constructor(private readonly pgService: PgService) { }

    create = async (customerInterface : ICreateCustomerRequest): Promise<any> => {
        try {
            const result = await this.pgService.fetchData(`INSERT INTO Customer (name,email,password)  
            VALUES ($1, $2, $3) RETURNING *`,
                customerInterface.name,
                customerInterface.email,
                customerInterface.password
            );

            return result[0];
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }

    }

    getAll = async (): Promise<any> => {
        try {
            return await this.pgService.fetchData('SELECT * FROM Customer')
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }
    }

    update = async (id: number, customerInterface : IUpdateCustomerRequest): Promise<any> => {
        try {
            await this.pgService.fetchData(`UPDATE Customer SET name = $1, email =  $2, password = $3 WHERE id = $4`,
                customerInterface.name,
                customerInterface.email,
                customerInterface.password,
                id
            )

            return {
                message: 'Customer Updated'
            }
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }
    }

    delete = async (id: number): Promise<any> => {
        try {
            await this.pgService.fetchData(`DELETE FROM Customer WHERE id = $1`,
                id)

            return {
                message: 'Customer Deleted'
            }
        } catch (error) {
            throw new InternalServerErrorException(`Error msg : ${error.message}`)
        }
    }

}