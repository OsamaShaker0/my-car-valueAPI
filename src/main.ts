import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieSession from 'cookie-session';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
const CookieSession = require('cookie-session');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    cookieSession({
      keys: [`${process.env.COOKIE_SECRET}`],
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Car Reports API')
    .setDescription('Documentation for authentication and reports endpoints')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      withCredentials: true,
    },
  });
  app.setBaseViewsDir(join(process.cwd(), 'views'));

  app.setViewEngine('hbs');

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(new Logger());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
