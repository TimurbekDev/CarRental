import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RentalService } from "./rental.service";
import { CreateRentalDTO } from "./dtos/create-rental.dto";
import { UpdateRentalDTO } from "./dtos/update-rental.dto";


@Controller('/rentals')
export class RentalController {
    constructor(private readonly rentalService: RentalService ) { }

    @Post('/')
    async createRental(@Body() rental: CreateRentalDTO) {
        return await this.rentalService.create(rental)
    }


    @Get('/')
    async getAllRentals(): Promise<any> {
        return await this.rentalService.getAll();
    }

    @Put('/:id')
    async updateRentalById(@Param('id') id: number, @Body() rental: UpdateRentalDTO): Promise<any> {
        return await this.rentalService.update(id, rental);
    }

    @Delete('/:id')
    async deleteRentalById(@Param('id') id: number): Promise<any> {
        return await this.rentalService.delete(id);
    }

}