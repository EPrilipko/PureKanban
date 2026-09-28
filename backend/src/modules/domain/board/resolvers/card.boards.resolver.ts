import { ResolveField, Resolver, Parent } from '@nestjs/graphql';

import { Card } from '@/modules/domain/card/entities/card.entity';

import { Board } from '../entities/board.entity';
import { BoardLoader } from '../board.loader';

@Resolver(() => Card)
export class CardBoardsResolver {
  public constructor(private readonly boardLoader: BoardLoader) {}

  @ResolveField(() => Board)
  public async board(@Parent() card: Card): Promise<Board> {
    return this.boardLoader.batchById.load(card.board.id);
  }
}
