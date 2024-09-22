type fuel_type = 'petrol' | 'disel' | 'car'

export declare interface  ICreateCarRequest {
    model : string,
    daily_price : number,
    fuel_type : fuel_type,
    is_available : boolean
}