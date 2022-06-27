import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

export function Serialize(dto: any){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any){}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        // console.log("Incoming Request = ", context)
        return next.handle().pipe(
            map((data: any) => {
                // console.log("Outgoing Request = ", data);
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            })
        )
    }
}