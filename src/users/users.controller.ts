import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/craete-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/authUser.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guadrs/auth.guard';
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  async whoami(@CurrentUser() user) {
    if (user) return user;
    throw new BadRequestException('There is no sign in user');
  }
  @Post('signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: AuthUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  signOut(@Session() session: any) {
    session.userId = null;
    return 'sign out';
  }
}
