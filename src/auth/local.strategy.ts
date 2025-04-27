import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { EmailDto } from 'src/users/dto/email.dto';
import { PasswordDto } from 'src/users/dto/password.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const emailDto = plainToInstance(EmailDto, { email });
    const passwordDto = plainToInstance(PasswordDto, { password });

    const emailErrors = await validate(emailDto);
    const passwordErrors = await validate(passwordDto);

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      throw new HttpException(
        'Bad request. Validation failed.',
        HttpStatus.BAD_REQUEST
      );
    }

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
