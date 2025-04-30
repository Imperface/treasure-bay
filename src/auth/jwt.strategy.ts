import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EmailDto } from 'src/users/dto/email.dto';
import { IdDto } from 'src/users/dto/id.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { id: string; email: string }) {
    // get id and email from payload
    const { id, email } = payload;

    // get user by id
    const user = await this.usersService.getUserById(id);

    // return error if user not found
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // get token from request
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    // return error if token is not matching
    if (user.token !== token) {
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.UNAUTHORIZED
      );
    }

    return { id, email };
  }
}
