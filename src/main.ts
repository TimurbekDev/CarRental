import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';

async function startApp() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });

  app.setGlobalPrefix('/api')

  const config = app.get(ConfigService)

  await app.listen(
    config.get<number>('APP_PORT'),
    config.get<string>('APP_HOST'),
    (): void => {
      console.log(`Server is running on port ${config.get<number>('APP_PORT')}`)
    });
}

startApp();