import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guadrs/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { ApproveReportDto } from './dtos/approve-report.dtp';
import { AdminGuard } from 'src/guadrs/admin.guard';
import { GetEstimateReportDto } from './dtos/get-estimate.dto';
import { AdminOrSameUserGuard } from 'src/guadrs/admin-or-same.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getReports(@Query() query: GetEstimateReportDto) {
    return this.reportsService.getReports(query);
  }

  @Get('not-approved')
  @UseGuards(AuthGuard, AdminGuard)
  getNotApprovedReports(@CurrentUser() user) {
    return this.reportsService.getNotApproved(user);
  }

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user) {
    return this.reportsService.create(body, user);
  }
  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard)
  approveRepor(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.approveReport(id, body);
  }
  @UseGuards(AuthGuard, AdminOrSameUserGuard)
  @Delete(':id')
  deleteReport(@Param('id') id: string, @CurrentUser() user) {
    return this.reportsService.deleteReport(id, user);
  }
}
