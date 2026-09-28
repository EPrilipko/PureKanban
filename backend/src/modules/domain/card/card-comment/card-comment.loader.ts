import { Injectable, Scope } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';

import { CardComment } from './entities/card-comment.entity';

@Injectable({ scope: Scope.REQUEST })
export class CardCommentLoader {
  public constructor(private readonly em: EntityManager) {}

  public batchByCardId = new DataLoader<string, CardComment[]>(
    async (cardIds: readonly string[]) => {
      const comments = await this.em.find(
        CardComment,
        {
          card: { id: { $in: cardIds } },
        },
        { populate: ['user'] },
      );

      const commentCardsMap = new Map<string, CardComment[]>();
      comments.forEach((comment) => {
        const cardComments = commentCardsMap.get(comment.card.id) || [];
        cardComments.push(comment);
        commentCardsMap.set(comment.card.id, cardComments);
      });

      return cardIds.map((cardId) => commentCardsMap.get(cardId) || []);
    },
  );
}
