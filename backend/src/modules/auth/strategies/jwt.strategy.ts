import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWTPayload } from '../dto/jwt.payload';
import { IUserSession } from '../interfaces/user-session.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public validate(payload: JWTPayload): IUserSession {
    return {
      id: payload.sub,
      deviceId: payload.deviceId,
    };
  }
}
