import {
  Resolver,
  Args,
  Query,
  Mutation,
  Subscription,
  ID,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { PubSub } from 'graphql-subscriptions';

import { byBoardMembers } from '@/common/graphql/filters/byBoardMembers';

import {
  CurrentUser,
  type IUserSession,
  Public,
  GqlWsAuthGuard,
} from '@/modules/auth';
import { IGraphQLContext } from '@/common/interfaces/context.interface';

import {
  BoardMembershipRead,
  BoardMembershipWrite,
  BoardMembershipGuard,
} from '@/modules/domain/board/board-member';

import { Board } from '../entities/board.entity';
import { BoardService } from '../board.service';
import {
  CreateBoardInput,
  UpdateBoardInput,
  BoardSubscriptionPayload,
} from '../dto';

@Resolver(() => Board)
export class BoardResolver {
  public constructor(
    private readonly boardService: BoardService,
    private readonly pubSub: PubSub,
    private readonly em: EntityManager,
  ) {}

  @Query(() => [Board])
  public async boards(
    @CurrentUser() userSession: IUserSession,
  ): Promise<Board[]> {
    return this.boardService.getAll(userSession.id);
  }

  @BoardMembershipRead()
  @UseGuards(BoardMembershipGuard)
  @Query(() => Board)
  public async board(
    @Args('boardId', { type: () => ID }) boardId: string,
  ): Promise<Board> {
    return this.boardService.getOne(boardId);
  }

  @Mutation(() => Board)
  public async createBoard(
    @CurrentUser() userSession: IUserSession,
    @Args('input') input: CreateBoardInput,
  ): Promise<Board> {
    return this.boardService.create(userSession.id, input);
  }

  @BoardMembershipWrite()
  @UseGuards(BoardMembershipGuard)
  @Mutation(() => Board)
  public async updateBoard(
    @Args('input') input: UpdateBoardInput,
  ): Promise<Board> {
    return this.boardService.update(input);
  }

  @BoardMembershipWrite()
  @UseGuards(BoardMembershipGuard)
  @Mutation(() => Board)
  public async deleteBoard(
    @Args('boardId', { type: () => ID }) boardId: string,
  ): Promise<Board> {
    return this.boardService.deleteOne(boardId);
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @Subscription(() => Board, {
    filter(payload: BoardSubscriptionPayload, _, context: IGraphQLContext) {
      return byBoardMembers(payload, context);
    },
    resolve(payload: BoardSubscriptionPayload) {
      return payload.board;
    },
  })
  public boardCreated() {
    return this.pubSub.asyncIterableIterator('boardCreated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @Subscription(() => Board, {
    filter(payload: BoardSubscriptionPayload, _, context: IGraphQLContext) {
      return byBoardMembers(payload, context);
    },
    resolve(payload: BoardSubscriptionPayload) {
      return payload.board;
    },
  })
  public boardUpdated() {
    return this.pubSub.asyncIterableIterator('boardUpdated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @Subscription(() => Board, {
    filter(payload: BoardSubscriptionPayload, _, context: IGraphQLContext) {
      return byBoardMembers(payload, context);
    },
    resolve(payload: BoardSubscriptionPayload) {
      return payload.board;
    },
  })
  public boardDeleted() {
    return this.pubSub.asyncIterableIterator('boardDeleted');
  }
}
