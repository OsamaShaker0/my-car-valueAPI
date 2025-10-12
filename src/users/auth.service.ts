import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/craete-user.dto';
import { Logger } from '@nestjs/common';
import { AuthUserDto } from './dtos/authUser.dto';
import { asapScheduler } from 'rxjs';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private logger: Logger,
  ) {}

  async signup(body: CreateUserDto) {
    let findUser = await this.userService.find(body.email);

    if (findUser) {
      this.logger.log(
        `user with exist email try to signup again Email : ${body.email}`,
      );
      throw new BadRequestException('Email in use ');
    }

    const salt = randomBytes(10).toString('hex');
    const hash = (await scrypt(body.password, salt, 30)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    body.password = result;
    const user = await this.userService.createUser(body);
    return user;
  }
  async signin(body: AuthUserDto) {
    const { email, password } = body;
    const findUser = await this.userService.find(email);

    if (!findUser) {
      this.logger.warn(`some one with  Email : ${email}  try to access API `);
      throw new BadRequestException('invalid credentials');
    }

    const [salt, storedHash] = findUser.password.split('.');
    const hash = (await scrypt(password, salt, 30)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('invalid credentials');
    }
    return findUser;
  }
}
