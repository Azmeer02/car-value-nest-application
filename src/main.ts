import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cookies = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.use(cookies({
      keys: ['asdfasfd'],
    })
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
