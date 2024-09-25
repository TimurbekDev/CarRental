import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, isString, IsString, Max, Min } from "class-validator"
import { fuel_type, ICreateCarRequest } from "../interfaces"

export class CreateCarDTO implements ICreateCarRequest  {

    @IsString()
    @IsNotEmpty()
    model : string

    @IsNotEmpty()
    @IsNumber()
    @Min(150_000)
    @Max(1_500_000)
    daily_price : number

    @IsEnum(fuel_type)
    fuel_type : fuel_type

    @IsBoolean()
    @IsOptional()
    is_available : boolean
}