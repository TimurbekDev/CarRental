import { Module } from '@nestjs/common';
import { CarModule, CustomerModule } from './modules';

@Module({
  imports: [CarModule,CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
