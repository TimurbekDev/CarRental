import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Roles } from "src/decorators/roles.decorator";

@Injectable()
export class CheckAuthGuard implements CanActivate{
    private roles : string[];

    constructor(private reflector : Reflector) {
    }
    canActivate(context: ExecutionContext): boolean{

        const roles = this.reflector.get(Roles,context.getHandler())
        const request = context.switchToHttp().getRequest<Request>();

        const { role } = request.body;

        if(!roles)
            return true


        if(!roles.includes(role))
            return false

        return true
    }
}