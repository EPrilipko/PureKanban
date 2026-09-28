import { Parent, ResolveField, Resolver, Args } from '@nestjs/graphql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { PaginationArgs } from '@/lib/pagination/cursor';

import { Card } from '@/modules/domain/card/entities/card.entity';

import {
  CardComment,
  CardCommentPaginated,
} from '../entities/card-comment.entity';
import { CardCommentLoader } from '../card-comment.loader';

@Resolver(() => Card)
export class CardCardCommentsResolver {
  public constructor(
    private readonly cardCommentLoader: CardCommentLoader,
    @InjectRepository(CardComment)
    private readonly cardCommentRepository: EntityRepository<CardComment>,
  ) {}

  @ResolveField(() => CardCommentPaginated)
  public async comments(
    @Parent() card: Card,
    @Args('input') args: PaginationArgs,
  ): Promise<CardCommentPaginated> {
    const first = args.first ?? 10;

    const cursor = await this.cardCommentRepository.findByCursor({
      first,
      after: args.after,
      populate: ['user'],
      where: { card: card.id },
      orderBy: { createdAt: 'DESC', id: 'DESC' },
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
