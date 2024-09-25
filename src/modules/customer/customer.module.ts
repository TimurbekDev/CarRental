import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from "@nestjs/common";
import { PgService } from "@postgres";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { consumers } from "stream";
import { LoggerMiddleware } from "src/middlewares";

@Module(({
    imports : [],
    controllers : [CustomerController],
    providers : [PgService,CustomerService],
}))
export class CustomerModule implements NestModule{
    configure (config : MiddlewareConsumer) {
        config.apply(LoggerMiddleware).forRoutes({
            path : '/customers',
            method : RequestMethod.ALL
        })
    }
}