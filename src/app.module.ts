import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'prisma/primsa.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.develop' }),
    UsersModule,
    ReportsModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
