import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { Public } from '@/modules/auth/decorators/public.decorator';

import { UserSession } from './entities/user-session.entity';
import { UserSessionService } from './user-session.service';

@Resolver(() => UserSession)
export class UserSessionResolver {
  public constructor(private readonly userSessionService: UserSessionService) {}

  @Public()
  @Query(() => [UserSession])
  public async allSessions(): Promise<UserSession[]> {
    return this.userSessionService.listAll();
  }

  @Public()
  @Mutation(() => Boolean)
  public async clearSessions(): Promise<boolean> {
    return this.userSessionService.clearAll();
  }
}
