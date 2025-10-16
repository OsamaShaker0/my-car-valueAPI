import {
  Logger,
  MiddlewareConsumer,
  Module,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { PrismaService } from 'prisma/primsa.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, Logger, AuthService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .exclude(
        { path: 'auth/signup', method: RequestMethod.POST }, // 👈 exclude signup
      )
      .forRoutes('*'); // apply everywhere else
  }
}
