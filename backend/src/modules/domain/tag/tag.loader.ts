import { Injectable, Scope } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';

import { Card } from '@/modules/domain/card/entities/card.entity';

import { Tag } from './entities/tag.entity';

@Injectable({ scope: Scope.REQUEST })
export class TagLoader {
  public constructor(private em: EntityManager) {}

  public batchByBoardId = new DataLoader<string, Tag[]>(
    async (boardIds: readonly string[]) => {
      const em = this.em.fork();
      const tags = await em.find(Tag, {
        board: { id: { $in: boardIds } },
      });

      const boardTagsMap = new Map<string, Tag[]>();
      tags.forEach((tag) => {
        const boardTags = boardTagsMap.get(tag.board.id) || [];
        boardTags.push(tag);
        boardTagsMap.set(tag.board.id, boardTags);
      });

      return boardIds.map((boardId) => boardTagsMap.get(boardId) || []);
    },
  );

  public batchByCardId = new DataLoader<string, Tag[]>(
    async (cardIds: readonly string[]) => {
      const em = this.em.fork();

      const cards = await em.find(
        Card,
        { id: { $in: cardIds } },
        { populate: ['tags'] },
      );

      const cardTagsMap = new Map<string, Tag[]>(
        cards.map((card) => [card.id, card.tags as any as Tag[]]),
      );

      return cardIds.map((cardId) => cardTagsMap.get(cardId) || []);
    },
  );
}
