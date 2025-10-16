import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/primsa.service';
import { CreateUserDto } from './dtos/craete-user.dto';
import { User } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {}

  async createUser(body: CreateUserDto): Promise<User> {
    const { email, password } = body;
    try {
      const user = await this.prisma.user.create({ data: { email, password } });
      this.logger.log(`user with email ${email} is created `);
      return user;
    } catch (error) {
      if (error.code == 'P2002') {
        this.logger.error(
          `can not create user with duplicated email  " ${email} " `,
        );
        throw new BadRequestException('user is exist ');
      }

      throw new InternalServerErrorException();
    }
  }
  async findOne(id: string) {
    if (id == null) {
      throw new BadRequestException('your id not valid ');
    }
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      return user;
    } catch (error) {
      
      if (error.code === 'P2023') {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }
      this.logger.error(`Error finding user with id ${id}`, error.stack);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async find(email: string) {
    const users = await this.prisma.user.findFirst({ where: { email } });

    return users;
  }
  async updateUser(id: string, body: UpdateUserDto) {
    try {
      const updateUser = await this.prisma.user.update({
        where: { id },
        data: { ...body },
      });

      this.logger.log(
        `User with ID ${id} updated successfully using data: ${JSON.stringify(body)}`,
      );
      return updateUser;
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(`User with ID ${id} not found`);
        throw new BadRequestException(`User with ID ${id} not found`);
      }

      this.logger.error(`Failed to update user ${id}: ${error.message}`);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
      this.logger.log(`user with id ${id} is deleted `);
      return 'User deleted successfully';
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(`User with ID ${id} not found`);
        throw new BadRequestException(`User with ID ${id} not found`);
      }

      this.logger.error(`Failed to delete user ${id}: ${error.message}`);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
