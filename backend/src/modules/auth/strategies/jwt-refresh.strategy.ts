import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { compare } from '@/lib/bcrypt';

import { UserSession } from '@/modules/auth/user-session/entities/user-session.entity';
import { UserSessionService } from '@/modules/auth/user-session/user-session.service';

import { JWTPayload } from '../dto/jwt.payload';

const cookieExtractor =
  (cookieField: string) =>
  (req: Request): string | null => {
    return req.cookies ? (req.cookies[cookieField] as string) : null;
  };

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private readonly refreshTokenField: string;

  public constructor(
    configService: ConfigService,
    private readonly userSessionService: UserSessionService,
  ) {
    const tokenField: string = configService.getOrThrow('JWT_COOKIE_FIELD');

    super({
      secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
      jwtFromRequest: cookieExtractor(tokenField),
    });

    this.refreshTokenField = tokenField;
  }

  public async validate(
    request: Request,
    payload: JWTPayload,
  ): Promise<UserSession> {
    const refreshToken = cookieExtractor(this.refreshTokenField)(request);

    const userSession = await this.userSessionService.findForUserAndDevice(
      payload.sub,
      payload.deviceId,
    );

    if (refreshToken && userSession) {
      const tokenMatch = await compare(
        refreshToken,
        userSession.refreshTokenHash,
      );

      if (tokenMatch) {
        return userSession;
      }
    }

    throw new UnauthorizedException(`Refresh token mismatch`);
  }
}
