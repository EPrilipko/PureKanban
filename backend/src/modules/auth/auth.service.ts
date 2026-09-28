import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

import { UserService } from '@/modules/auth/user';
import { User } from '@/modules/auth/user/entities/user.entity';
import { UserSessionService } from '@/modules/auth/user-session';

import { JWTResponse } from './dto/jwt.response';
import { JWTPayload } from './dto/jwt.payload';
import { IUserSession } from './interfaces/user-session.interface';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class AuthService {
  private readonly refreshTokenField: string;

  public constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userSessionService: UserSessionService,
  ) {
    this.refreshTokenField = configService.getOrThrow('JWT_COOKIE_FIELD');
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.getByEmail(email);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (passwordMatch) {
        return user;
      }
    }

    return null;
  }

  public async login(
    user: User,
    deviceId: string,
    request: Request,
  ): Promise<JWTResponse> {
    const payload: JWTPayload = { sub: user.id, deviceId };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: '1d',
    });

    await this.userSessionService.createOrUpdate({
      user,
      deviceId,
      refreshToken,
    });

    request.res?.cookie(this.refreshTokenField, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { accessToken };
  }

  public async createUser(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userService.getByEmail(input.email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    return this.userService.create(input);
  }

  public async logout(
    userSession: IUserSession,
    request: Request,
  ): Promise<boolean> {
    await this.userSessionService.deleteByUserAndDevice(
      userSession.id,
      userSession.deviceId,
    );
    request.res?.clearCookie(this.refreshTokenField);

    return true;
  }
}
