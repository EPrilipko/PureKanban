import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { User } from '@/modules/auth/user/entities/user.entity';
import { Board } from '@/modules/domain/board/entities/board.entity';

import { BoardMember } from './entities/board-member.entity';
import {
  CreateBoardMemberInput,
  UpdateBoardMemberInput,
  DeleteBoardMemberInput,
  BoardMemberSubscriptionPayload,
} from './dto';

@Injectable()
export class BoardMemberService {
  public constructor(
    private readonly em: EntityManager,
    private readonly pubSub: PubSub,
  ) {}

  public async createOne(input: CreateBoardMemberInput): Promise<BoardMember> {
    const [board, user] = await Promise.all([
      this.em.findOneOrFail(Board, input.boardId, {
        populate: ['boardMembers:ref'],
      }),
      this.em.findOneOrFail(User, input.userId),
    ]);

    const boardMember = this.em.create(BoardMember, {
      board,
      user,
      role: input.role,
    });

    await this.em.persist(boardMember).flush();

    await this.pubSub.publish('boardMemberCreated', {
      boardMember,
      boardMemberIds: board.boardMembers.map(
        (boardMember) => boardMember.user.id,
      ),
    } satisfies BoardMemberSubscriptionPayload);

    return boardMember;
  }

  public async updateOne(input: UpdateBoardMemberInput): Promise<BoardMember> {
    const [board, boardMember] = await Promise.all([
      this.em.findOneOrFail(Board, input.boardId, {
        populate: ['boardMembers:ref'],
      }),
      this.em.findOneOrFail(BoardMember, {
        board: { id: input.boardId },
        user: { id: input.userId },
      }),
    ]);

    boardMember.role = input.role;

    await this.em.flush();

    await this.em.refresh(boardMember, {
      populate: ['board.boardMembers'],
    });

    await this.pubSub.publish('boardMemberUpdated', {
      boardMember,
      boardMemberIds: board.boardMembers.map(
        (boardMember) => boardMember.user.id,
      ),
    } satisfies BoardMemberSubscriptionPayload);

    return boardMember;
  }

  public async deleteOne(input: DeleteBoardMemberInput): Promise<BoardMember> {
    const [board, boardMember] = await Promise.all([
      this.em.findOneOrFail(Board, input.boardId, {
        populate: ['boardMembers:ref'],
      }),
      this.em.findOneOrFail(BoardMember, {
        board: { id: input.boardId },
        user: { id: input.userId },
      }),
    ]);

    const boardMemberIds = board.boardMembers.map(
      (boardMember) => boardMember.user.id,
    );

    await this.em.remove(boardMember).flush();

    await this.pubSub.publish('boardMemberDeleted', {
      boardMember,
      boardMemberIds,
    } satisfies BoardMemberSubscriptionPayload);

    return boardMember;
  }
}
