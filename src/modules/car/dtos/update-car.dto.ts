import { fuel_type } from "../interfaces"

export class UpdateCarDTO{
    model : string
    daily_price : number
    fuel_type : fuel_type
    is_available : boolean
}