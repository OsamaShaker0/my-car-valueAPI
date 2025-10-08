import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/craete-user.dto';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
  // @UseInterceptors(new SerializeInterceptor(UserDto))

  @Get()
  findUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }
  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Patch(':id')
  updateUserById(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
