import { ArgumentMetadata, NotAcceptableException, PipeTransform } from "@nestjs/common";
import { isInt } from "class-validator";

export class CheckEnuumValue<T> implements PipeTransform{
    private  enumValue: T;

    constructor(cur  : T) {
        this.enumValue = cur
    }

    transform(value: any,metadata : ArgumentMetadata){
        if(!isInt(this.enumValue[value])){
            throw new NotAcceptableException('Invalid value')
        }
    }
}