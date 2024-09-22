import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CarService } from "./car.service";
import { CreateCarDTO } from "./dtos/create-car-dto";
import { UpdateCarDTO } from "./dtos/update-car.dto";

@Controller('/cars')
export class CarController {
    constructor(private readonly carService : CarService) {}

    @Post('/')
    async  createCar(@Body() car: CreateCarDTO){
        return await this.carService.create(car)
    }


    @Get('/')
    async getAllCars():Promise<any>{
        return await this.carService.getAll();
    }

    @Put('/:id')
    async updateCarById(@Param('id') id:number,@Body()  car:UpdateCarDTO):Promise<any>{
        return await this.carService.update(id,car);
    }

    @Delete('/:id')
    async  deleteCarById(@Param('id') id:number):Promise<any>{
        return await this.carService.delete(id);
    }

}