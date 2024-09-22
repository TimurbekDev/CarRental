import { Module } from "@nestjs/common";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";
import { PgService } from "src/pg";

@Module({
    imports: [],
    controllers: [CarController],
    providers: [CarService,PgService]
})
export class CarModule {}