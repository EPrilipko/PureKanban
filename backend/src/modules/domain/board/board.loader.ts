import { Injectable, Scope } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';

import { Board } from './entities/board.entity';

@Injectable({ scope: Scope.REQUEST })
export class BoardLoader {
  public constructor(private readonly em: EntityManager) {}

  public batchById = new DataLoader<string, Board>(
    async (ids: readonly string[]) => {
      const em = this.em.fork();
      const boards = await em.find(Board, { id: { $in: ids } });

      const boardsMap = new Map<string, Board>(
        boards.map((board) => [board.id, board]),
      );

      return ids.map((id) => boardsMap.get(id) as Board);
    },
  );
}
