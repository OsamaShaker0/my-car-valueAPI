import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/primsa.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { ApproveReportDto } from './dtos/approve-report.dtp';
import { Logger } from '@nestjs/common';
import { GetEstimateReportDto } from './dtos/get-estimate.dto';
import { get } from 'http';
import { report } from 'process';

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private logger: Logger,
  ) {}
  async getReports(query: GetEstimateReportDto) {
    const { make, model, year } = query;
    const where: any = {};
    if (query.make) {
      where.make = make;
    }
    if (query.model) {
      where.model = model;
    }
    if (query.year) {
      where.year = {
        gte: year - 3,
        lte: year + 3,
      };
    }

    if (query.mileage) {
      where.mileage = query.mileage;
    }

    if (query.lat && query.lng) {
      where.lat = {
        gte: query.lat - 4,
        lte: query.lat + 4,
      };
      where.lng = {
        gte: query.lng - 4,
        lte: query.lng + 4,
      };
    }
    where.approved = true;
    const reports = await this.prisma.report.findMany({
      where: { ...where },
    });

    return { numOfReports: reports.length, reports };
  }
  async getCurrentUserReports(user) {
    const CurrentUserReports = await this.prisma.report.findMany({
      where: { userId: user.id },
    });
    return CurrentUserReports;
  }
  async create(body: CreateReportDto, user: User) {
    const findUser = this.usersService.findOne(user.id);
    body.userId = user.id;
    const { make, model, year, mileage, price, lat, lng, userId } = body;

    const report = await this.prisma.report.create({
      data: { make, model, year, mileage, price, lat, lng, userId },
    });
    this.logger.log(`user with id ${user.id} has create a new  report`);
    return report;
  }
  async approveReport(id: string, body: ApproveReportDto) {
    let report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) {
      throw new NotFoundException('report not found ');
    }
    const { approved } = body;
    report = await this.prisma.report.update({
      where: { id },
      data: { approved: approved },
    });
    this.logger.log(`admin  has chnage report approved `);
    return report;
  }

  async getNotApproved(user) {
    const NotAprrovedReports = await this.prisma.report.findMany({
      where: { approved: false },
    });
    return {
      numOfReports: NotAprrovedReports.length,
      reports: NotAprrovedReports,
    };
  }
  async deleteReport(id: string, user) {
    try {
      await this.prisma.report.delete({ where: { id } });
      return `report deleted `;
    } catch (error) {
      if (error.code == 'P2025') {
        throw new NotFoundException(
          `can not found report with given id of ${id}`,
        );
      }
      if (error.code == 'P2023') {
        throw new BadRequestException(`the id of ${id}  is wrong formated `);
      }
      return error;
    }
  }
}
