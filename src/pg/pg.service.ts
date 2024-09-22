import { ConflictException, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Client } from 'pg'

@Injectable()
export class PgService implements OnModuleInit , OnModuleDestroy {
    private client: Client;
    constructor() {
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'CarRental',
            password: 'Timurbek123@',
            port: 5432,
        })
    }

    async fetchData(query: string, ...params: any[]): Promise<any> {
        try {
            const result = await this.client.query(query, params);
            return result.rows;
        } catch (error) {
            throw new ConflictException('Db Error : ',error.message)
        }
    }

    async onModuleInit(){
        await this.client.connect()
    }

    async onModuleDestroy() {
        await this.client.end()
    }
}