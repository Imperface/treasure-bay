import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SignInUserDto } from 'src/users/dto/sign-in-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    // prevent validate email and password
    const signInUserDto = plainToInstance(SignInUserDto, { email, password });
    const signInErrors = await validate(signInUserDto);

    // return error if email and password not valid
    if (signInErrors.length > 0) {
      throw new HttpException(
        'Bad request. Validation failed.',
        HttpStatus.BAD_REQUEST
      );
    }

    // try to sign in with email and password
    const user = await this.authService.validateUser(email, password);

    // return error if user not found
    if (!user) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
