import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { Request, Response } from "express";

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        // console.log(exception.message);
        
        const requestTime = new Date().toISOString()

        if(exception instanceof ValidationError){

            return response.status(404).json({
                message: `Vallidation `,
                errorName : exception,
                requestTime,
                url : request.baseUrl,
                statusCode : 404
            });
        }

        if(exception instanceof HttpException){

            return response.status(exception.getStatus()).json({
                message : exception.message,
                requestTime,
                url : request.baseUrl,
                errorName : exception.name,
                statusCode : exception.getStatus()
            })
        } else{

            return response.status(500).json({
                message: exception?.message || 'Internal server error',
                requestTime,
                url: request.url,
                errorName: exception?.name,
                statusCode: 500,
            });
        }
    }
}