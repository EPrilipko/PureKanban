import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PubSub } from 'graphql-subscriptions';

import { User } from '@/modules/auth/user/entities/user.entity';
import { Card } from '@/modules/domain/card/entities/card.entity';

import { CardHistory, CardHistoryAction } from './entities/card-history.entity';
import { type CardHistoryPayload } from './entities/card-history-payload.entity';
import {
  CardCreatedEvent,
  CardUpdatedEvent,
  CardOwnerUpdatedEvent,
  CardAssigneesUpdatedEvent,
  CardCommentCreatedEvent,
  CardHistorySubscriptionPayload,
} from './dto';

@Injectable()
export class CardHistoryService {
  public constructor(
    private readonly em: EntityManager,
    @InjectRepository(CardHistory)
    private readonly cardHistoryRepository: EntityRepository<CardHistory>,
    private readonly pubSub: PubSub,
  ) {}

  @OnEvent(CardCreatedEvent.EVENT_TYPE)
  public async onCardCreated(payload: CardCreatedEvent) {
    const { card, actorId } = payload;

    await this.createAndFlush(card, actorId, {
      action: CardHistoryAction.Created,
    });
  }

  @OnEvent(CardUpdatedEvent.EVENT_TYPE)
  public async onCardUpdated(payload: CardUpdatedEvent) {
    const { actorId, card, beforeCard, afterCard } = payload;

    await this.createAndFlush(card, actorId, {
      action: CardHistoryAction.Updated,
      beforeCard,
      afterCard,
    });
  }

  @OnEvent(CardOwnerUpdatedEvent.EVENT_TYPE)
  public async onCardOwnerUpdated(payload: CardOwnerUpdatedEvent) {
    const { actorId, card, beforeOwner, afterOwner } = payload;

    await this.createAndFlush(card, actorId, {
      action: CardHistoryAction.OwnerUpdated,
      beforeOwner,
      afterOwner,
    });
  }

  @OnEvent(CardAssigneesUpdatedEvent.EVENT_TYPE)
  public async onCardAssigneesUpdated(payload: CardAssigneesUpdatedEvent) {
    const { actorId, card, beforeAssignees, afterAssignees } = payload;

    await this.createAndFlush(card, actorId, {
      action: CardHistoryAction.AssigneesUpdated,
      beforeAssignees,
      afterAssignees,
    });
  }

  @OnEvent(CardCommentCreatedEvent.EVENT_TYPE)
  public async onCardCommentCreated(payload: CardCommentCreatedEvent) {
    const { actorId, card, comment } = payload;

    await this.createAndFlush(card, actorId, {
      action: CardHistoryAction.CommentAdded,
      comment,
    });
  }

  private async createAndFlush(
    card: Card,
    actorId: number,
    payload: typeof CardHistoryPayload,
  ) {
    const historyItem = this.cardHistoryRepository.create({
      card,
      author: await this.em.findOneOrFail(User, actorId),
      payload,
    });

    await this.em.persist(historyItem).flush();
    await this.pubSub.publish('cardHistoryCreated', {
      cardId: card.id,
      history: historyItem,
    } satisfies CardHistorySubscriptionPayload);
  }
}
