import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/primsa.service';
import { NotFoundError } from 'rxjs';
import { ReportsService } from 'src/reports/reports.service';

// export class AdminOrSameUserGuard implements CanActivate {
//   constructor(private prisma: PrismaService) {}
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const reportId = request.params.id;

//     if (!reportId) return false;
// console.o
//     // 🔍 Find the user who owns this report
//     const report = await this.prisma.report.findFirst({
//       where: { id: reportId },
//     });
//     if (!report) {
//       throw new ForbiddenException('Report does not belong to any user');
//     }
//     const userId = report?.userId;

//     const currentUser = request.currentUser;

//     if (userId === currentUser.id) return true;

//     if (currentUser.admin) return true;

//     throw new ForbiddenException('You are not allowed to access this resource');
//   }
// }
@Injectable()
export class AdminOrSameUserGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private reportService: ReportsService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const reportId = request.params.id;
    if (!reportId) return false;
    const report = await this.prisma.report.findFirst({
      where: { id: reportId },
    });
    if (!report) throw new NotFoundException();
    const userId = report.userId;
    const currentUserId = request.currentUser.id;
    if (userId !== currentUserId && request.currentUser.admin == false) {
      return false;
    }
    return true;
  }
}
