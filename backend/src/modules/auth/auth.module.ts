import { Module } from '@nestjs/common';

import { JWTConfiguredModule } from '@/config/jwt.configured';
import { PassportConfiguredModule } from '@/config/passport.configured';

import { UserModule } from './user';
import { UserSessionModule } from './user-session';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JWTRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    PassportConfiguredModule,
    JWTConfiguredModule,
    UserModule,
    UserSessionModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JWTStrategy,
    JWTRefreshStrategy,
  ],
})
export class AuthModule {}
