import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { LexorankService } from '@/lib/lexorank';
import { Board } from '@/modules/domain/board/entities/board.entity';

import { Column } from './entities/column.entity';
import {
  CreateColumnInput,
  UpdateColumnInput,
  MoveColumnInput,
  ColumnSubscriptionPayload,
} from './dto';

@Injectable()
export class ColumnService {
  public constructor(
    private readonly em: EntityManager,
    private readonly lexorankService: LexorankService,
    private readonly pubSub: PubSub,
  ) {}

  public async getOne(id: string): Promise<Column> {
    return this.em.findOneOrFail(Column, { id });
  }

  public async create(input: CreateColumnInput): Promise<Column> {
    const lastBoardColumn = await this.em.findOne(
      Column,
      { board: { id: input.boardId } },
      { orderBy: { rank: 'DESC' } },
    );

    const column = this.em.create(Column, {
      name: input.name,
      color: input.color,
      board: this.em.getReference(Board, input.boardId),
      rank: this.lexorankService.generateRank({
        prevRank: lastBoardColumn?.rank,
      }),
      maxCardsCount: input.maxCardsCount,
    });

    await this.em.persist(column).flush();

    await this.pubSub.publish('columnCreated', {
      boardId: input.boardId,
      column: column,
    } satisfies ColumnSubscriptionPayload);

    return column;
  }

  public async update(input: UpdateColumnInput): Promise<Column> {
    const column = await this.em.findOneOrFail(Column, { id: input.id });

    wrap(column).assign(
      {
        name: input.name,
        color: input.color,
        maxCardsCount: input.maxCardsCount,
      },
      { ignoreUndefined: true },
    );

    await this.em.flush();

    await this.pubSub.publish('columnUpdated', {
      boardId: input.boardId,
      column: column,
    } satisfies ColumnSubscriptionPayload);

    return column;
  }

  public async moveColumn(input: MoveColumnInput): Promise<Column> {
    const { id, prevColumnId, nextColumnId } = input;

    const [column, prevColumn, nextColumn] = await Promise.all([
      this.em.findOneOrFail(Column, id),
      prevColumnId ? this.em.findOneOrFail(Column, prevColumnId) : null,
      nextColumnId ? this.em.findOneOrFail(Column, nextColumnId) : null,
    ]);

    column.rank = this.lexorankService.generateRank({
      prevRank: prevColumn?.rank,
      nextRank: nextColumn?.rank,
    });

    await this.em.flush();

    await this.pubSub.publish('columnUpdated', {
      boardId: input.boardId,
      column: column,
    } satisfies ColumnSubscriptionPayload);

    return column;
  }

  public async deleteOne(id: string): Promise<Column> {
    const column = await this.em.findOneOrFail(Column, { id });

    await this.em.remove(column).flush();

    await this.pubSub.publish('columnDeleted', {
      boardId: column.board.id,
      column: column,
    } satisfies ColumnSubscriptionPayload);

    return column;
  }
}
