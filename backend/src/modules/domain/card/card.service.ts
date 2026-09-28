import { Injectable } from '@nestjs/common';
import { raw } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { PubSub } from 'graphql-subscriptions';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { isEqual } from 'lodash';

import { LexorankService } from '@/lib/lexorank';

import * as CardHistory from '@/modules/domain/card/card-history/dto';
import { User } from '@/modules/auth/user/entities/user.entity';
import { Column } from '@/modules/domain/column/entities/column.entity';
import { Tag } from '@/modules/domain/tag/entities/tag.entity';
import * as Notifications from '@/modules/domain/notification/dto';

import { Card, PartialCard } from './entities/card.entity';
import {
  CreateCardInput,
  UpdateCardInput,
  MoveCardResponse,
  MoveCardInput,
  SearchCardsInput,
  UpdateCardOwnerInput,
  UpdateCardAssigneesInput,
  CardSubscriptionPayload,
} from './dto';

@Injectable()
export class CardService {
  public constructor(
    private readonly em: EntityManager,
    private readonly lexorankService: LexorankService,
    private readonly pubSub: PubSub,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async getById(id: string): Promise<Card> {
    return this.em.findOneOrFail(Card, id);
  }

  public async getAllByBoard(boardId: string): Promise<Card[]> {
    return this.em.findAll(Card, {
      where: { board: { id: boardId } },
    });
  }

  public async search(input: SearchCardsInput): Promise<Card[]> {
    return this.em.findAll(Card, {
      where: {
        board: { id: input.boardId },
        [raw(`search_vector @@ plainto_tsquery('russian', ?)`, [input.query])]:
          [],
      },
    });
  }

  public async create(actorId: number, input: CreateCardInput): Promise<Card> {
    const [lastCard, column] = await Promise.all([
      this.em.findOne(
        Card,
        { column: { id: input.columnId } },
        { orderBy: { rank: 'DESC' } },
      ),
      this.em.findOneOrFail(Column, { id: input.columnId }),
    ]);

    const card = this.em.create(Card, {
      name: input.name,
      description: input.description || '',
      board: column.board,
      column,
      rank: this.lexorankService.generateRank({
        prevRank: lastCard?.rank,
      }),
    });

    await this.em.persist(card).flush();
    await this.pubSub.publish('cardCreated', {
      boardId: input.boardId,
      card,
    } satisfies CardSubscriptionPayload);

    this.eventEmitter.emit(
      CardHistory.CardCreatedEvent.EVENT_TYPE,
      new CardHistory.CardCreatedEvent(card, actorId),
    );

    return card;
  }

  public async update(actorId: number, input: UpdateCardInput): Promise<Card> {
    const [card, tags] = await Promise.all([
      this.em.findOneOrFail(Card, input.id, { populate: ['tags'] }),
      input.tagIds
        ? this.em.findAll(Tag, { where: { id: { $in: input.tagIds } } })
        : undefined,
    ]);

    const beforePayload: PartialCard = {};
    const afterPayload: PartialCard = {};

    if (input.name && card.name !== input.name) {
      beforePayload.name = card.name;
      afterPayload.name = input.name;
      card.name = input.name;
    }
    if (input.description && card.description !== input.description) {
      beforePayload.description = card.description;
      afterPayload.description = input.description;
      card.description = input.description;
    }
    if (
      tags !== undefined &&
      !isEqual(
        card.tags.map((tag) => tag.id),
        input.tagIds,
      )
    ) {
      beforePayload.tags = card.tags.getItems();
      afterPayload.tags = tags;
      card.tags.set(tags);
    }

    await this.em.flush();

    this.eventEmitter.emit(
      CardHistory.CardUpdatedEvent.EVENT_TYPE,
      new CardHistory.CardUpdatedEvent(
        actorId,
        card,
        beforePayload,
        afterPayload,
      ),
    );

    await this.pubSub.publish('cardUpdated', {
      boardId: input.boardId,
      card,
    } satisfies CardSubscriptionPayload);

    return card;
  }

  public async updateOwner(
    actorId: number,
    input: UpdateCardOwnerInput,
  ): Promise<Card> {
    const currentUser = this.em.getReference(User, actorId);

    const [card, owner] = await Promise.all([
      this.em.findOneOrFail(Card, input.id),
      input.ownerId ? this.em.findOneOrFail(User, input.ownerId) : null,
    ]);
    const prevOwner = card.owner;

    card.owner = owner;

    await this.em.flush();

    this.eventEmitter.emit(
      Notifications.CardOwnerChangedEvent.EVENT_TYPE,
      new Notifications.CardOwnerChangedEvent(currentUser, card, prevOwner),
    );
    this.eventEmitter.emit(
      CardHistory.CardOwnerUpdatedEvent.EVENT_TYPE,
      new CardHistory.CardOwnerUpdatedEvent(
        actorId,
        card,
        prevOwner,
        card.owner,
      ),
    );

    await this.pubSub.publish('cardUpdated', {
      boardId: input.boardId,
      card,
    } satisfies CardSubscriptionPayload);

    return card;
  }

  public async updateAssignees(
    actorId: number,
    input: UpdateCardAssigneesInput,
  ): Promise<Card> {
    const currentUser = this.em.getReference(User, actorId);

    const [card, assignees] = await Promise.all([
      this.em.findOneOrFail(Card, input.id, { populate: ['assignees'] }),
      input.assigneeIds
        ? this.em.findAll(User, { where: { id: { $in: input.assigneeIds } } })
        : null,
    ]);
    const prevAssignees = card.assignees.getItems();

    if (input.assigneeIds?.length) {
      card.assignees.set(assignees!);
    } else {
      card.assignees.removeAll();
    }

    await this.em.flush();

    this.eventEmitter.emit(
      Notifications.CardAssigneesChangedEvent.EVENT_TYPE,
      new Notifications.CardAssigneesChangedEvent(
        currentUser,
        card,
        prevAssignees,
      ),
    );
    this.eventEmitter.emit(
      CardHistory.CardAssigneesUpdatedEvent.EVENT_TYPE,
      new CardHistory.CardAssigneesUpdatedEvent(
        actorId,
        card,
        prevAssignees,
        assignees || [],
      ),
    );

    await this.pubSub.publish('cardUpdated', {
      boardId: input.boardId,
      card,
    } satisfies CardSubscriptionPayload);

    return card;
  }

  public async moveCard(input: MoveCardInput): Promise<MoveCardResponse> {
    const { cardId, columnId, prevCardId, nextCardId } = input;

    const [card, column] = await Promise.all([
      this.em.findOneOrFail(Card, { id: cardId }),
      columnId ? this.em.findOneOrFail(Column, { id: columnId }) : null,
    ]);

    const sourceColumn = card.column;
    let targetColumn = card.column;

    if (column) {
      card.column = column;
      targetColumn = column;
    }

    await this.updateCardRank(card, prevCardId, nextCardId);

    await this.em.flush();

    const response: MoveCardResponse = {
      boardId: card.board.id,
      card,
      sourceColumn,
      targetColumn,
    };

    await this.pubSub.publish('cardMoved', response);

    return response;
  }

  private async updateCardRank(
    card: Card,
    prevCardId: string | undefined,
    nextCardId: string | undefined,
  ) {
    const [prevCard, nextCard] = await Promise.all([
      prevCardId ? this.em.findOneOrFail(Card, prevCardId) : null,
      nextCardId ? this.em.findOneOrFail(Card, nextCardId) : null,
    ]);

    card.rank = this.lexorankService.generateRank({
      prevRank: prevCard?.rank,
      nextRank: nextCard?.rank,
    });
  }
}
