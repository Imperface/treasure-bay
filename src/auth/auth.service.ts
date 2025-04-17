import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IdDto } from 'src/users/dto/id.dto';
import { SignInPasswordDto } from './dto/signIn.dto';
import { EmailDto } from 'src/users/dto/email.dto';
import { PasswordDto } from 'src/users/dto/password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: EmailDto, pass: PasswordDto): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (user === null || !user) {
      return null;
    }

    const isPasswordMatching = await compare(String(pass), user.password);

    if (isPasswordMatching) {
      return user;
    }

    return null;
  }

  async signIn(id: IdDto, email: EmailDto) {
    const payload = { id, email };

    const token = this.jwtService.sign(payload);

    const signInUser = await this.usersService.updateToken(id, token);

    return signInUser;
  }
}
