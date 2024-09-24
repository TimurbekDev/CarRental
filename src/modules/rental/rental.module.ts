import { Module } from "@nestjs/common";
import { RentalController } from "./rental.controller";
import { PgService } from "@postgres";
import { RentalService } from "./rental.service";

@Module({
    imports : [],
    controllers : [RentalController],
    providers : [PgService,RentalService]
})
export class RentalModule {}
