import {
  Resolver,
  Args,
  Query,
  Mutation,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { byBoard } from '@/common/graphql/filters/byBoard';
import { Public, GqlWsAuthGuard } from '@/modules/auth';

import {
  BoardMembershipGuard,
  BoardMembershipRead,
  BoardMembershipWrite,
} from '@/modules/domain/board/board-member';

import { Column } from '../entities/column.entity';
import { ColumnService } from '../column.service';
import {
  CreateColumnInput,
  UpdateColumnInput,
  MoveColumnInput,
  ColumnSubscriptionInput,
  ColumnSubscriptionPayload,
} from '../dto';
import { PubSub } from 'graphql-subscriptions';

@UseGuards(BoardMembershipGuard)
@Resolver(() => Column)
export class ColumnResolver {
  public constructor(
    private readonly columnService: ColumnService,
    private readonly pubSub: PubSub,
  ) {}

  @BoardMembershipRead()
  @Query(() => Column)
  public async column(
    @Args('boardId', { type: () => ID }) _,
    @Args('columnId', { type: () => ID }) columnId: string,
  ): Promise<Column> {
    return this.columnService.getOne(columnId);
  }

  @BoardMembershipWrite()
  @Mutation(() => Column)
  public async createColumn(
    @Args('input') input: CreateColumnInput,
  ): Promise<Column> {
    return this.columnService.create(input);
  }

  @BoardMembershipWrite()
  @Mutation(() => Column)
  public async updateColumn(
    @Args('input') input: UpdateColumnInput,
  ): Promise<Column> {
    return this.columnService.update(input);
  }

  @BoardMembershipWrite()
  @Mutation(() => Column)
  public async moveColumn(
    @Args('input') input: MoveColumnInput,
  ): Promise<Column> {
    return this.columnService.moveColumn(input);
  }

  @BoardMembershipWrite()
  @Mutation(() => Column)
  public async deleteColumn(
    @Args('boardId', { type: () => ID }) _,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Column> {
    return this.columnService.deleteOne(id);
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Column, {
    filter(
      payload: ColumnSubscriptionPayload,
      variables: { input: ColumnSubscriptionInput },
    ) {
      return byBoard(payload, variables);
    },
    resolve(payload: ColumnSubscriptionPayload) {
      return payload.column;
    },
  })
  public columnCreated(
    @Args('input', { type: () => ColumnSubscriptionInput }) _,
  ) {
    return this.pubSub.asyncIterableIterator('columnCreated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Column, {
    filter(
      payload: ColumnSubscriptionPayload,
      variables: { input: ColumnSubscriptionInput },
    ) {
      return byBoard(payload, variables);
    },
    resolve(payload: ColumnSubscriptionPayload) {
      return payload.column;
    },
  })
  public columnUpdated(
    @Args('input', { type: () => ColumnSubscriptionInput }) _,
  ) {
    return this.pubSub.asyncIterableIterator('columnUpdated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Column, {
    filter(
      payload: ColumnSubscriptionPayload,
      variables: { input: ColumnSubscriptionInput },
    ) {
      return byBoard(payload, variables);
    },
    resolve(payload: ColumnSubscriptionPayload) {
      return payload.column;
    },
  })
  public columnDeleted(
    @Args('input', { type: () => ColumnSubscriptionInput }) _,
  ) {
    return this.pubSub.asyncIterableIterator('columnDeleted');
  }
}
