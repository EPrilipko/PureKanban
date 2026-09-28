import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Card } from '@/modules/domain/card/entities/card.entity';

import { User } from '../entities/user.entity';
import { UserLoader } from '../user.loader';

@Resolver(() => Card)
export class CardUsersResolver {
  public constructor(private readonly userLoader: UserLoader) {}

  @ResolveField(() => User)
  public async owner(@Parent() card: Card): Promise<User | null> {
    return this.userLoader.ownerByCardId.load(card.id);
  }

  @ResolveField(() => [User])
  public async assignees(@Parent() card: Card): Promise<User[]> {
    return this.userLoader.assineesByCardId.load(card.id);
  }
}
