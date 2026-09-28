import { Module } from '@nestjs/common';

import { UserSessionService } from './user-session.service';
import { UserSessionResolver } from './user-session.resolver';

@Module({
  providers: [UserSessionResolver, UserSessionService],
  exports: [UserSessionService],
})
export class UserSessionModule {}
