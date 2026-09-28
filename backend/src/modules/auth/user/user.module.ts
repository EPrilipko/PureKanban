import { Module } from '@nestjs/common';

import { UserResolvers } from './resolvers';
import { UserService } from './user.service';
import { UserLoader } from './user.loader';

@Module({
  providers: [...UserResolvers, UserService, UserLoader],
  exports: [UserService],
})
export class UserModule {}
