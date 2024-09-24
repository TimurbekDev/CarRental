import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CarService } from "./car.service";
import { CreateCarDTO } from "./dtos/create-car-dto";
import { UpdateCarDTO } from "./dtos/update-car.dto";
import { query } from "express";

@Controller('/cars')
export class CarController {
    constructor(private readonly carService : CarService) {}

    @Post('/')
    async  createCar(@Body() car: CreateCarDTO){
        return await this.carService.create(car)
    }


    @Get('/')
    async getAllCars(@Query() queries:Record<string,string>):Promise<any>{
        return await this.carService.getAll(queries);
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