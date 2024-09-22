type fuel_type = 'petrol' | 'disel' | 'car'

export class CreateCarDTO {
    model : string
    daily_price : number
    fuel_type : fuel_type
    is_available : boolean
}