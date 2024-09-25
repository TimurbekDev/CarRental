export enum fuel_type {
    petrol = 'petrol',
    disel = 'disel',
    gas = 'gas',
}
export declare interface ICreateCarRequest {
    model: string,
    daily_price: number,
    fuel_type: fuel_type,
    is_available: boolean
}