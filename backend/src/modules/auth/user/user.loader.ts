import { Injectable, Scope } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';

import { CardComment } from '@/modules/domain/card/card-comment/entities/card-comment.entity';

import { User } from './entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  public constructor(private em: EntityManager) {}

  public ownerByCardId = new DataLoader<string, User | null>(
    async (cardIds: readonly string[]) => {
      const em = this.em.fork();
      const cardOwners = await em.findAll(User, {
        where: { ownedCards: { id: { $in: cardIds } } },
        populate: ['ownedCards'],
      });

      const cardOwnersMap = new Map<string, User>();
      cardOwners.forEach((owner) => {
        owner.ownedCards.map((card) => {
          cardOwnersMap.set(card.id, owner);
        });
      });

      return cardIds.map((cardId) => cardOwnersMap.get(cardId) || null);
    },
  );

  public assineesByCardId = new DataLoader<string, User[]>(
    async (cardIds: readonly string[]) => {
      const em = this.em.fork();
      const cardAssignees = await em.findAll(User, {
        where: { assignedCards: { id: { $in: cardIds } } },
        populate: ['assignedCards'],
      });

      const cardAssigneesMap = new Map<string, User[]>();
      cardAssignees.forEach((assignee) => {
        assignee.assignedCards.map((card) => {
          const cardAssignees = cardAssigneesMap.get(card.id) || [];
          cardAssignees.push(assignee);
          cardAssigneesMap.set(card.id, cardAssignees);
        });
      });

      return cardIds.map((cardId) => cardAssigneesMap.get(cardId) || []);
    },
  );

  public byCommentId = new DataLoader<string, User | null>(
    async (commentIds: readonly string[]) => {
      const em = this.em.fork();

      const comments = await em.findAll(CardComment, {
        where: { id: { $in: commentIds } },
        populate: ['user'],
      });

      const commentUsersMap = new Map<string, User>(
        comments.map((comment) => [comment.id, comment.user]),
      );

      return commentIds.map(
        (commentId) => commentUsersMap.get(commentId) || null,
      );
    },
  );
}
