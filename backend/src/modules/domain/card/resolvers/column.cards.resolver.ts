import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Column } from '@/modules/domain/column/entities/column.entity';

import { CardLoader } from '../card.loader';
import { Card } from '../entities/card.entity';

@Resolver(() => Column)
export class ColumnCardsResolver {
  public constructor(private readonly cardsLoader: CardLoader) {}

  @ResolveField(() => [Card])
  public async cards(@Parent() column: Column): Promise<Card[]> {
    this.cardsLoader.batchByColumnId.clear(column.id);
    return this.cardsLoader.batchByColumnId.load(column.id);
  }
}
