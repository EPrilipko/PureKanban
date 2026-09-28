import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { User } from '@/modules/auth/user/entities/user.entity';

import { BoardMember } from '../entities/board-member.entity';
import { BoardMemberLoader } from '../board-member.loader';

@Resolver(() => User)
export class UserBoardMembersLoader {
  public constructor(private readonly boardMemberLoader: BoardMemberLoader) {}

  @ResolveField(() => [BoardMember])
  public async boardMemberships(@Parent() user: User): Promise<BoardMember[]> {
    return this.boardMemberLoader.batchByUserId.load(user.id);
  }
}
