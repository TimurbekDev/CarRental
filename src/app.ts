import { Module, ValidationPipe } from '@nestjs/common';
import { CarModule, CustomerModule, RentalModule } from '@modules';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import { ExceptionHandlerFilter } from './filters/exception-handler.filter';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [CarModule, CustomerModule, RentalModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [dbConfig]
    })
  ],
  controllers: [],
  providers: [{
    useClass: ExceptionHandlerFilter,
    provide: APP_FILTER
  }],
})
export class AppModule { }
