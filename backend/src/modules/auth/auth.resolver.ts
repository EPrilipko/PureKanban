import { Query, Mutation, Resolver, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import type { Request } from 'express';

import { User } from '@/modules/auth/user/entities/user.entity';
import { UserService } from '@/modules/auth/user';
import { UserSession } from '@/modules/auth/user-session/entities/user-session.entity';

import { AuthService } from './auth.service';

import { GqlLocalAuthGuard } from './guards/local.guard';
import { GqlJWTRefreshGuard } from './guards/jwt-refresh.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';

import { LoginInput } from './dto/login.input';
import { CreateUserInput } from './dto/create-user.input';
import type { IUserSession } from './interfaces/user-session.interface';
import { JWTResponse } from './dto/jwt.response';

@Resolver()
export class AuthResolver {
  public constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => JWTResponse)
  public async login(
    @CurrentUser() user: User,
    @Context('req') request: Request,
    @Args('input') input: LoginInput,
  ): Promise<JWTResponse> {
    return this.authService.login(user, input.deviceId, request);
  }

  @Public()
  @Mutation(() => User)
  public async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<User> {
    return this.authService.createUser(input);
  }

  @Public()
  @UseGuards(GqlJWTRefreshGuard)
  @Mutation(() => JWTResponse)
  public async refresh(
    @CurrentUser() session: UserSession,
    @Context('req') request: Request,
  ): Promise<JWTResponse> {
    return this.authService.login(session.user, session.deviceId, request);
  }

  @Mutation(() => Boolean)
  public async logout(
    @CurrentUser() userSession: IUserSession,
    @Context('req') request: Request,
  ): Promise<boolean> {
    return this.authService.logout(userSession, request);
  }

  @Query(() => User)
  public whoAmI(
    @CurrentUser() userSession: IUserSession,
  ): Promise<User | null> {
    return this.userService.getById(userSession.id);
  }
}
