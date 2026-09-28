import { Injectable, Scope } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';

import { Column } from './entities/column.entity';

@Injectable({ scope: Scope.REQUEST })
export class ColumnLoader {
  public constructor(private readonly em: EntityManager) {}

  public readonly batchByBoardId = new DataLoader<string, Column[]>(
    async (boardIds: readonly string[]) => {
      const columns = await this.em.find(Column, {
        board: { id: { $in: boardIds } },
      });

      const boardColumnsMap = new Map<string, Column[]>();
      columns.forEach((column) => {
        const boardColumns = boardColumnsMap.get(column.board.id) || [];
        boardColumns.push(column);
        boardColumnsMap.set(column.board.id, boardColumns);
      });

      return boardIds.map((boardId) => boardColumnsMap.get(boardId) || []);
    },
  );
}
