import { Module } from '@nestjs/common';
import { CarModule, CustomerModule, RentalModule } from '@modules';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';

@Module({
  imports: [CarModule,CustomerModule,RentalModule,
    ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal : true,
      load : [dbConfig]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
