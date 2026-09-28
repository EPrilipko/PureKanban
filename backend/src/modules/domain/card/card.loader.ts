import { Injectable, Scope } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';

import { Card } from './entities/card.entity';

@Injectable({ scope: Scope.REQUEST })
export class CardLoader {
  public constructor(private readonly em: EntityManager) {}

  public batchByColumnId = new DataLoader<string, Card[]>(
    async (columnIds: readonly string[]) => {
      const em = this.em.fork();

      const cards = await em.find(Card, {
        column: { id: { $in: columnIds } },
      });

      const cardColumnsMap = new Map<string, Card[]>();
      cards.forEach((card) => {
        const columnCards = cardColumnsMap.get(card.column.id) || [];
        columnCards.push(card);
        cardColumnsMap.set(card.column.id, columnCards);
      });

      return columnIds.map((columnId) => cardColumnsMap.get(columnId) || []);
    },
  );
}
