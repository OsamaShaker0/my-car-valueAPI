import { Logger, Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ReportsController],
  providers: [ReportsService, Logger],
})
export class ReportsModule {}
