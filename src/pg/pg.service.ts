import { ConflictException, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from 'pg'

@Injectable()
export class PgService implements OnModuleInit , OnModuleDestroy {
    private client: Client;
    constructor(private readonly config : ConfigService) {
        this.client = new Client({
            user: config.get<string>('database.user'),
            host: config.get<string>('database.host'),
            database: config.get<string>('database.name'),
            password: config.get<string>('database.password'),
            port: config.get<number>('database.port')
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