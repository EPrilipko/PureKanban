import { Parent, ResolveField, Resolver, Args } from '@nestjs/graphql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { PaginationArgs } from '@/lib/pagination/cursor';

import { Card } from '@/modules/domain/card/entities/card.entity';

import { CardHistoryLoader } from '../card-history.loader';
import {
  CardHistory,
  CardHistoryPaginated,
} from '../entities/card-history.entity';

@Resolver(() => Card)
export class CardCardHistoryResolver {
  public constructor(
    private readonly cardHistoryLoader: CardHistoryLoader,
    @InjectRepository(CardHistory)
    private readonly cardHistoryRepository: EntityRepository<CardHistory>,
  ) {}

  @ResolveField(() => CardHistoryPaginated)
  public async history(
    @Parent() card: Card,
    @Args('input') args: PaginationArgs,
  ): Promise<CardHistoryPaginated> {
    const first = args.first ?? 10;

    const cursor = await this.cardHistoryRepository.findByCursor({
      first,
      after: args.after,
      where: { card: card.id },
      orderBy: { createdAt: 'DESC', id: 'DESC' },
      populate: ['author'],
    });

    return {
      edges: cursor.items.map((item) => ({
        node: item,
        cursor: cursor.from(item),
      })),
      pageInfo: {
        startCursor: cursor.startCursor,
        endCursor: cursor.endCursor,
        hasNextPage: cursor.hasNextPage,
        hasPreviousPage: cursor.hasPrevPage,
      },
    };
  }
}
