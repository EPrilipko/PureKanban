import { ResolveField, Resolver, Parent } from '@nestjs/graphql';

import { CardComment } from '@/modules/domain/card/card-comment/entities/card-comment.entity';

import { UserLoader } from '../user.loader';
import { User } from '../entities/user.entity';

@Resolver(() => CardComment)
export class CardCommentsUsersResolver {
  public constructor(private readonly userLoader: UserLoader) {}

  @ResolveField(() => User)
  public async user(@Parent() cardComment: CardComment): Promise<User | null> {
    return this.userLoader.byCommentId.load(cardComment.id);
  }
}
