import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const requestTime = new Date().toString()

        console.log({
            url: req.baseUrl,
            method: req.method,
            time: requestTime
        });

        next()
    }
}