import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { fuckingJWTSecret } from 'src/constants/fuckingJWTSecret';
import { OnlyIDParamDTO } from 'src/users/dto/onlyIDParam.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
  }

  async validate(payload: { id: OnlyIDParamDTO; email: string }) {
    return { id: payload.id, email: payload.email };
  }
}
