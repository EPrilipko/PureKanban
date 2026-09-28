import { ResolveField, Resolver, Parent } from '@nestjs/graphql';

import { Card } from '@/modules/domain/card/entities/card.entity';

import { Tag } from '../entities/tag.entity';
import { TagLoader } from '../tag.loader';

@Resolver(() => Card)
export class CardTagsResolver {
  public constructor(private readonly tagsLoader: TagLoader) {}

  @ResolveField(() => [Tag])
  public async tags(@Parent() card: Card): Promise<Tag[]> {
    return this.tagsLoader.batchByCardId.load(card.id);
  }
}
