import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { CarService } from "./car.service";
import { CreateCarDTO } from "./dtos/create-car-dto";
import { UpdateCarDTO } from "./dtos/update-car.dto";
import { ParseIntCustomePipe } from "src/pipes/parse-int.pipe";
import { CheckEnuumValue } from "src/pipes/check-Value.pipe";
import { fuel_type } from "./interfaces";
import { LoggingInterceptor } from "@interceptors";
import { CheckAuthGuard } from "@guards";
import { Roles } from "@decorators";

@Controller('/cars')
@UseInterceptors(LoggingInterceptor)
export class CarController {
    constructor(private readonly carService : CarService) {}

    @Roles(['admin'])
    @Post('/')
    async  createCar(@Body() car: CreateCarDTO){
        try {
            return await this.carService.create(car)
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }


    @Get('/')
    async getAllCars(@Query() queries:Record<string,string>):Promise<any>{
        return await this.carService.getAll(queries);
    }

    @Put('/:id')
    async updateCarById(@Param('id',new ParseIntCustomePipe) id:number,@Body()  car:UpdateCarDTO):Promise<any>{
        return await this.carService.update(id,car);
    }

    @Delete('/:id')
    async  deleteCarById(@Param('id',new ParseIntCustomePipe) id:number):Promise<any>{
        return await this.carService.delete(id);
    }

    @Get('/:def')
    async pract(@Param('def',new CheckEnuumValue(fuel_type)) def : any){
        return await this.carService.delete(1);
    }
}