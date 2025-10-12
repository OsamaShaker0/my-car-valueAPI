import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieSession from 'cookie-session';
const CookieSession = require('cookie-session');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['dhuiguyguykds'],
    }),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(new Logger());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
