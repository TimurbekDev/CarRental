import { Module } from "@nestjs/common";
import { RentalController } from "./rental.controller";
import { PgService } from "src/pg";
import { RentalService } from "./rental.service";

@Module({
    imports : [],
    controllers : [RentalController],
    providers : [PgService,RentalService]
})
export class RentalModule {}
