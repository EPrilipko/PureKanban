import { Resolver, Mutation, Subscription, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { byCard } from '@/common/graphql/filters/byCard';

import {
  CurrentUser,
  type IUserSession,
  Public,
  GqlWsAuthGuard,
} from '@/modules/auth';
import {
  BoardMembershipGuard,
  BoardMembershipRead,
  BoardMembershipWrite,
} from '@/modules/domain/board/board-member';

import { CardComment } from '../entities/card-comment.entity';
import { CardCommentService } from '../card-comment.service';
import {
  CreateCardCommentInput,
  UpdateCardCommentInput,
  CardCommentSubscriptionInput,
  CardCommentSubscriptionPayload,
} from '../dto';

@UseGuards(BoardMembershipGuard)
@Resolver(() => CardComment)
export class CardCommentResolver {
  public constructor(
    private readonly cardCommentService: CardCommentService,
    private readonly pubSub: PubSub,
  ) {}

  @BoardMembershipWrite()
  @Mutation(() => CardComment)
  async createCardComment(
    @CurrentUser() userSession: IUserSession,
    @Args('input') input: CreateCardCommentInput,
  ): Promise<CardComment> {
    return this.cardCommentService.create(userSession.id, input);
  }

  @BoardMembershipWrite()
  @Mutation(() => CardComment)
  async updateCardComment(
    @Args('input') input: UpdateCardCommentInput,
  ): Promise<CardComment> {
    return this.cardCommentService.update(input);
  }

  @BoardMembershipWrite()
  @Mutation(() => CardComment)
  async deleteCardComment(
    @Args('boardId', { type: () => ID }) _: string,
    @Args('commentId', { type: () => ID }) commentId: string,
  ): Promise<CardComment> {
    return this.cardCommentService.delete(commentId);
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => CardComment, {
    filter(
      payload: CardCommentSubscriptionPayload,
      variables: { input: CardCommentSubscriptionInput },
    ) {
      return byCard(payload, variables);
    },
    resolve(payload: CardCommentSubscriptionPayload) {
      return payload.comment;
    },
  })
  public commentCreated(
    @Args('input', { type: () => CardCommentSubscriptionInput }) _,
  ) {
    return this.pubSub.asyncIterableIterator('cardCommentCreated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => CardComment, {
    filter(
      payload: CardCommentSubscriptionPayload,
      variables: { input: CardCommentSubscriptionInput },
    ) {
      return byCard(payload, variables);
    },
    resolve(payload: CardCommentSubscriptionPayload) {
      return payload.comment;
    },
  })
  public commentUpdated(
    @Args('input', { type: () => CardCommentSubscriptionInput }) _,
  ) {
    return this.pubSub.asyncIterableIterator('cardCommentUpdated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => CardComment, {
    filter(
      payload: CardCommentSubscriptionPayload,
      variables: { input: CardCommentSubscriptionInput },
    ) {
      return byCard(payload, variables);
    },
    resolve(payload: CardCommentSubscriptionPayload) {
      return payload.comment;
    },
  })
  public commentDeleted(
    @Args('input', { type: () => CardCommentSubscriptionInput }) _,
  ) {
    return this.pubSub.asyncIterableIterator('cardCommentDeleted');
  }
}
