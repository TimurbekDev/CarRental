import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        console.log("Soro'v keldi");
        
        const requestTime = Date.now();

        return next.handle().pipe(
            tap(()=>{
                const responseTime = Date.now() - requestTime;
                console.log(`Response Time: ${responseTime}ms`)
            })
        )
    }
}