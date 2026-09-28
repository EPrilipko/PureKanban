import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { byBoard } from '@/common/graphql/filters/byBoard';

import { Public, GqlWsAuthGuard } from '@/modules/auth';

import {
  BoardMembershipGuard,
  BoardMembershipRead,
  BoardMembershipWrite,
} from '@/modules/domain/board/board-member';

import { Tag } from '../entities/tag.entity';
import { TagService } from '../tag.service';
import {
  CreateTagInput,
  UpdateTagInput,
  TagSubscriptionInput,
  TagSubscriptionPayload,
} from '../dto';

@UseGuards(BoardMembershipGuard)
@Resolver(() => Tag)
export class TagResolver {
  public constructor(
    private readonly tagService: TagService,
    private readonly pubSub: PubSub,
  ) {}

  @BoardMembershipRead()
  @Query(() => [Tag])
  public async tags(@Args('boardId', { type: () => ID }) _): Promise<Tag[]> {
    return this.tagService.getAll();
  }

  @BoardMembershipRead()
  @Query(() => Tag)
  public async tagById(
    @Args('boardId', { type: () => ID }) _,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Tag> {
    return this.tagService.getById(id);
  }

  @BoardMembershipWrite()
  @Mutation(() => Tag)
  public async createTag(@Args('input') input: CreateTagInput): Promise<Tag> {
    return this.tagService.create(input);
  }

  @BoardMembershipWrite()
  @Mutation(() => Tag)
  public async updateTag(@Args('input') input: UpdateTagInput): Promise<Tag> {
    return this.tagService.update(input);
  }

  @BoardMembershipWrite()
  @Mutation(() => Tag)
  public async deleteTag(
    @Args('boardId', { type: () => ID }) _,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Tag> {
    return this.tagService.deleteOne(id);
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Tag, {
    filter(
      payload: TagSubscriptionPayload,
      variables: { input: TagSubscriptionInput },
    ) {
      return byBoard(payload, variables);
    },
    resolve(payload: TagSubscriptionPayload) {
      return payload.tag;
    },
  })
  public tagCreated(@Args('input', { type: () => TagSubscriptionInput }) _) {
    return this.pubSub.asyncIterableIterator('tagCreated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Tag, {
    filter(
      payload: TagSubscriptionPayload,
      variables: { input: TagSubscriptionInput },
    ) {
      return byBoard(payload, variables);
    },
    resolve(payload: TagSubscriptionPayload) {
      return payload.tag;
    },
  })
  public tagUpdated(@Args('input', { type: () => TagSubscriptionInput }) _) {
    return this.pubSub.asyncIterableIterator('tagUpdated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Tag, {
    filter(
      payload: TagSubscriptionPayload,
      variables: { input: TagSubscriptionInput },
    ) {
      return byBoard(payload, variables);
    },
    resolve(payload: TagSubscriptionPayload) {
      return payload.tag;
    },
  })
  public tagDeleted(@Args('input', { type: () => TagSubscriptionInput }) _) {
    return this.pubSub.asyncIterableIterator('tagDeleted');
  }
}
