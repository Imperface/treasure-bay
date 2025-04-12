import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OnlyIDParamDTO } from 'src/users/dto/onlyIDParam.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (user === null || !user) {
      return null;
    }

    const isPasswordMatching = await compare(pass, user.password);

    if (isPasswordMatching) {
      return user;
    }

    return null;
  }

  async signIn(id: OnlyIDParamDTO, email: string) {
    const payload = { id, email };

    const token = this.jwtService.sign(payload);

    const signInUser = await this.usersService.updateToken(id, token);

    return signInUser;
  }
}
