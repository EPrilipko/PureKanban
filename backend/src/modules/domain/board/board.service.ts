import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { BoardMemberService } from './board-member';
import { BoardMemberRole } from './board-member/entities/board-member.entity';

import { Board } from './entities/board.entity';
import {
  CreateBoardInput,
  UpdateBoardInput,
  BoardSubscriptionPayload,
} from './dto';

@Injectable()
export class BoardService {
  public constructor(
    private readonly em: EntityManager,
    private readonly boardMemberService: BoardMemberService,
    private readonly pubSub: PubSub,
  ) {}

  public async getOne(id: string): Promise<Board> {
    return this.em.findOneOrFail(Board, { id });
  }

  public async getAll(userId: number): Promise<Board[]> {
    return this.em.findAll(Board, {
      where: { boardMembers: { user: { id: userId } } },
      orderBy: { createdAt: 'DESC' },
    });
  }

  public async create(userId: number, input: CreateBoardInput): Promise<Board> {
    const board = this.em.create(Board, {
      name: input.name,
      color: input.color,
    });

    const boardMember = await this.boardMemberService.createOne({
      userId,
      boardId: board.id,
      role: BoardMemberRole.Author,
    });

    board.boardMembers.add(boardMember);

    await this.em.persist(board).flush();

    await this.pubSub.publish('boardCreated', {
      board,
      boardMemberIds: board.boardMembers.map(
        (boardMember) => boardMember.user.id,
      ),
    } satisfies BoardSubscriptionPayload);

    return board;
  }

  public async update(input: UpdateBoardInput): Promise<Board> {
    const board = await this.em.findOneOrFail(
      Board,
      { id: input.boardId },
      { populate: ['boardMembers:ref'] },
    );

    wrap(board).assign(
      { name: input.name, color: input.color },
      { ignoreUndefined: true },
    );

    await this.em.flush();

    await this.pubSub.publish('boardUpdated', {
      board,
      boardMemberIds: board.boardMembers.map(
        (boardMember) => boardMember.user.id,
      ),
    } satisfies BoardSubscriptionPayload);

    return board;
  }

  public async deleteOne(id: string): Promise<Board> {
    const board = await this.em.findOneOrFail(
      Board,
      { id },
      { populate: ['boardMembers:ref'] },
    );

    await this.pubSub.publish('boardDeleted', {
      board,
      boardMemberIds: board.boardMembers.map(
        (boardMember) => boardMember.user.id,
      ),
    } satisfies BoardSubscriptionPayload);

    await this.em.remove(board).flush();

    return board;
  }
}
