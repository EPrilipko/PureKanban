import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { PubSub } from 'graphql-subscriptions';

import { Public, GqlWsAuthGuard } from '@/modules/auth';
import { IGraphQLContext } from '@/common/interfaces/context.interface';

import { byBoardMembers } from '@/common/graphql/filters/byBoardMembers';

import { BoardMembershipGuard } from '../guards/board-membership.guard';
import { BoardMembershipWrite } from '../decorators/board-membership.decorator';
import { BoardMember } from '../entities/board-member.entity';
import { BoardMemberService } from '../board-member.service';
import {
  CreateBoardMemberInput,
  UpdateBoardMemberInput,
  DeleteBoardMemberInput,
  BoardMemberSubscriptionPayload,
} from '../dto';

@Resolver(() => BoardMember)
export class BoardMemberResolver {
  public constructor(
    private readonly em: EntityManager,
    private readonly boardMemberService: BoardMemberService,
    private readonly pubSub: PubSub,
  ) {}

  @BoardMembershipWrite()
  @UseGuards(BoardMembershipGuard)
  @Mutation(() => BoardMember)
  public async createBoardMember(
    @Args('input') input: CreateBoardMemberInput,
  ): Promise<BoardMember> {
    return this.boardMemberService.createOne(input);
  }

  @BoardMembershipWrite()
  @UseGuards(BoardMembershipGuard)
  @Mutation(() => BoardMember)
  public async updateBoardMember(
    @Args('input') input: UpdateBoardMemberInput,
  ): Promise<BoardMember> {
    return this.boardMemberService.updateOne(input);
  }

  @BoardMembershipWrite()
  @UseGuards(BoardMembershipGuard)
  @Mutation(() => BoardMember)
  public async deleteBoardMember(
    @Args('input') input: DeleteBoardMemberInput,
  ): Promise<BoardMember> {
    return this.boardMemberService.deleteOne(input);
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @Subscription(() => BoardMember, {
    filter(
      payload: BoardMemberSubscriptionPayload,
      _,
      context: IGraphQLContext,
    ) {
      return byBoardMembers(payload, context);
    },
    resolve(payload: BoardMemberSubscriptionPayload) {
      return payload.boardMember;
    },
  })
  public boardMemberCreated() {
    return this.pubSub.asyncIterableIterator('boardMemberCreated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @Subscription(() => BoardMember, {
    filter(
      payload: BoardMemberSubscriptionPayload,
      _,
      context: IGraphQLContext,
    ) {
      return byBoardMembers(payload, context);
    },
    resolve(payload: BoardMemberSubscriptionPayload) {
      return payload.boardMember;
    },
  })
  public boardMemberUpdated() {
    return this.pubSub.asyncIterableIterator('boardMemberUpdated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @Subscription(() => BoardMember, {
    filter(
      payload: BoardMemberSubscriptionPayload,
      _,
      context: IGraphQLContext,
    ) {
      return byBoardMembers(payload, context);
    },
    resolve(payload: BoardMemberSubscriptionPayload) {
      return payload.boardMember;
    },
  })
  public boardMemberDeleted() {
    return this.pubSub.asyncIterableIterator('boardMemberDeleted');
  }
}
