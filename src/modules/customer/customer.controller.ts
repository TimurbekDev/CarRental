import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateCustomerDTO } from "./dtos/create-customer.dto";
import { CustomerService } from "./customer.service";
import { UpdateCustomerDTO } from "./dtos/update-customer.dto";


@Controller('/customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post('/')
    async createCustomer(@Body() customer: CreateCustomerDTO) {
        return await this.customerService.create(customer)
    }


    @Get('/')
    async getAllCustomers(): Promise<any> {
        return await this.customerService.getAll();
    }

    @Put('/:id')
    async updateCustomerById(@Param('id') id: number, @Body() customer: UpdateCustomerDTO): Promise<any> {
        return await this.customerService.update(id, customer);
    }

    @Delete('/:id')
    async deleteCustomerById(@Param('id') id: number): Promise<any> {
        return await this.customerService.delete(id);
    }

}