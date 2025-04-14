import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInEmailDto, SignInPasswordDto } from './dto/signIn.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: SignInEmailDto,
    password: SignInPasswordDto
  ): Promise<any> {
    const emailDto = plainToInstance(SignInEmailDto, { email });
    const passwordDto = plainToInstance(SignInPasswordDto, { password });

    const emailErrors = await validate(emailDto);
    const passwordErrors = await validate(passwordDto);

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      throw new HttpException(
        'Bad request. Validation failed.',
        HttpStatus.BAD_REQUEST
      );
    }

    const user = await this.authService.validateUser(
      String(email),
      String(password)
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
