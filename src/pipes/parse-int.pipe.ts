import { ArgumentMetadata, NotAcceptableException, PipeTransform } from "@nestjs/common";

export class ParseIntCustomePipe implements PipeTransform{
    transform(value: any,metadata : ArgumentMetadata){
        const number = parseInt(value,10)

        if(isNaN(number)){
            throw new NotAcceptableException(`${metadata.data} should be valid number`)
        }

        return number;
    }
}