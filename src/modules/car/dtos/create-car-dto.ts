import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, isString, IsString, Max, Min } from "class-validator"
import { ICreateCarRequest } from "../interfaces"

type fuel_type = 'petrol' | 'disel' | 'car'

export class CreateCarDTO implements ICreateCarRequest  {

    @IsString()
    @IsNotEmpty()
    model : string

    @IsNotEmpty()
    @IsNumber()
    @Min(150_000)
    @Max(1_500_000)
    daily_price : number

    @IsString()
    fuel_type : fuel_type

    @IsBoolean()
    is_available : boolean
}