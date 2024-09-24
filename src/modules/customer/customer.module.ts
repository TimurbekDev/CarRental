import { Module } from "@nestjs/common";
import { PgService } from "@postgres";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";

@Module(({
    imports : [],
    controllers : [CustomerController],
    providers : [PgService,CustomerService],
}))
export class CustomerModule {}