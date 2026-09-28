import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { Board } from '@/modules/domain/board/entities/board.entity';

import { Column } from '../entities/column.entity';
import { ColumnLoader } from '../column.loader';

@Resolver(() => Board)
export class BoardColumnsResolver {
  public constructor(private readonly columnLoader: ColumnLoader) {}

  @ResolveField(() => [Column])
  public async columns(@Parent() board: Board): Promise<Column[]> {
    this.columnLoader.batchByBoardId.clear(board.id);
    return this.columnLoader.batchByBoardId.load(board.id);
  }
}
