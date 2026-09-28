import { Injectable, Scope } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';

import { CardHistory } from './entities/card-history.entity';

@Injectable({ scope: Scope.REQUEST })
export class CardHistoryLoader {
  public constructor(private readonly em: EntityManager) {}

  public batchByCardId = new DataLoader<string, CardHistory[]>(
    async (cardIds: readonly string[]) => {
      const historyItems = await this.em.find(
        CardHistory,
        {
          card: { id: { $in: cardIds } },
        },
        {
          populate: ['author'],
        },
      );

      const cardHistoryItemsMap = new Map<string, CardHistory[]>();
      historyItems.forEach((historyItem) => {
        const cardHistoryItems =
          cardHistoryItemsMap.get(historyItem.card.id) || [];
        cardHistoryItems.push(historyItem);
        cardHistoryItemsMap.set(historyItem.card.id, cardHistoryItems);
      });

      return cardIds.map((cardId) => cardHistoryItemsMap.get(cardId) || []);
    },
  );
}
