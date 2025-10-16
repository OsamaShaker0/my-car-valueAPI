import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  InternalServerErrorException,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import helmet from 'helmet';

import cookieSession from 'cookie-session';
const CookieSession = require('cookie-session');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: [`${process.env.COOKIE_SECRET}`],
    }),
  );
  app.use(helmet)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(new Logger());
  app.enableCors()
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
