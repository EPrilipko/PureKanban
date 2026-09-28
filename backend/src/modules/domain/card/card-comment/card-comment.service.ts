import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { PubSub } from 'graphql-subscriptions';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { User } from '@/modules/auth/user/entities/user.entity';
import { Card } from '@/modules/domain/card/entities/card.entity';
import * as CardHistoryEvents from '@/modules/domain/card/card-history/dto';

import { CardComment } from './entities/card-comment.entity';
import {
  CreateCardCommentInput,
  UpdateCardCommentInput,
  CardCommentSubscriptionPayload,
} from './dto';

@Injectable()
export class CardCommentService {
  public constructor(
    private readonly em: EntityManager,
    private readonly pubSub: PubSub,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async create(
    actorId: number,
    input: CreateCardCommentInput,
  ): Promise<CardComment> {
    const card = await this.em.findOneOrFail(Card, { id: input.cardId });

    const comment = this.em.create(CardComment, {
      text: input.text,
      card,
      user: this.em.getReference(User, actorId),
    });

    await this.em.persist(comment).flush();

    await this.pubSub.publish('cardCommentCreated', {
      cardId: input.cardId,
      comment,
    } satisfies CardCommentSubscriptionPayload);

    this.eventEmitter.emit(
      CardHistoryEvents.CardCommentCreatedEvent.EVENT_TYPE,
      new CardHistoryEvents.CardCommentCreatedEvent(actorId, card, comment),
    );

    return comment;
  }

  public async update(input: UpdateCardCommentInput): Promise<CardComment> {
    const comment = await this.em.findOneOrFail(CardComment, { id: input.id });

    comment.text = input.text;

    await this.em.flush();

    await this.pubSub.publish('cardCommentUpdated', {
      cardId: comment.card.id,
      comment,
    } satisfies CardCommentSubscriptionPayload);

    return comment;
  }

  public async delete(id: string): Promise<CardComment> {
    const comment = await this.em.findOneOrFail(CardComment, id);

    await this.pubSub.publish('cardCommentDeleted', {
      cardId: comment.card.id,
      comment,
    } satisfies CardCommentSubscriptionPayload);

    await this.em.remove(comment).flush();

    return comment;
  }
}
