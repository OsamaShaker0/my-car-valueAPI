import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../../prisma/primsa.service';
const primsa = new PrismaService();
export const CurrentUser = createParamDecorator(
  async (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
