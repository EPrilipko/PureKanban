import {
  Resolver,
  Query,
  Mutation,
  Subscription,
  Args,
  Int,
  ID,
} from '@nestjs/graphql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, FilterQuery } from '@mikro-orm/postgresql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';

import { type IGraphQLContext } from '@/common/interfaces/context.interface';

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

import { Notification } from '../entities/notification.entity';
import { NotificationPaginated } from '../entities/notification-paginated.entity';
import { NotificationService } from '../notification.service';
import {
  notificationFilter,
  notificationCountFilter,
} from '../notification.subscription-filters';
import {
  GetNotificationsInput,
  CountNotificationsInput,
  UnreadNotificationsCountUpdatedInput,
  UnreadNotificationsCountUpdatedPayload,
  NotificationSubscriptionPayload,
  NotificationSubscriptionInput,
} from '../dto';

@UseGuards(BoardMembershipGuard)
@Resolver(() => Notification)
export class NotificationResolver {
  public constructor(
    private readonly pubSub: PubSub,
    private readonly notificationService: NotificationService,
    @InjectRepository(Notification)
    private readonly notificationRepository: EntityRepository<Notification>,
  ) {}

  @BoardMembershipRead()
  @Query(() => NotificationPaginated)
  public async notifications(
    @CurrentUser() userSession: IUserSession,
    @Args('input') input: GetNotificationsInput,
  ): Promise<NotificationPaginated> {
    const first = input.first ?? 10;

    const where: FilterQuery<Notification> = {
      recipient: userSession.id,
      board: input.boardId,
    };
    if (input.onlyUnread) {
      where.isRead = false;
    }

    const cursor = await this.notificationRepository.findByCursor({
      first,
      after: input.after,
      where,
      orderBy: { createdAt: 'DESC' },
      populate: ['*'],
    });

    return {
      edges: cursor.items.map((item) => ({
        node: item,
        cursor: cursor.from(item),
      })),
      pageInfo: {
        startCursor: cursor.startCursor,
        endCursor: cursor.endCursor,
        hasNextPage: cursor.hasNextPage,
        hasPreviousPage: cursor.hasPrevPage,
      },
    };
  }

  @BoardMembershipRead()
  @Query(() => Int)
  public countUnreadNotifications(
    @CurrentUser() userSession: IUserSession,
    @Args('input') input: CountNotificationsInput,
  ): Promise<number> {
    return this.notificationService.countUnread(userSession.id, input.boardId);
  }

  @BoardMembershipWrite()
  @Mutation(() => Notification)
  public async readNotification(
    @Args('boardId', { type: () => ID }) _,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Notification> {
    return this.notificationService.readOne(id);
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Notification, {
    filter(
      payload: NotificationSubscriptionPayload,
      variables: { input: NotificationSubscriptionInput },
      context: IGraphQLContext,
    ) {
      return notificationFilter(payload, variables, context);
    },
    resolve(payload: NotificationSubscriptionPayload) {
      return payload.notification;
    },
  })
  public notificationCreated(
    @Args('input', { type: () => NotificationSubscriptionInput }) _,
  ) {
    return this.pubSub.asyncIterableIterator('notificationCreated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Notification, {
    filter(
      payload: NotificationSubscriptionPayload,
      variables: { input: NotificationSubscriptionInput },
      context: IGraphQLContext,
    ) {
      return notificationFilter(payload, variables, context);
    },
    resolve(payload: NotificationSubscriptionPayload) {
      return payload.notification;
    },
  })
  public notificationUpdated(
    @Args('input', { type: () => NotificationSubscriptionInput }) _,
  ) {
    return this.pubSub.asyncIterableIterator('notificationUpdated');
  }

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @BoardMembershipRead()
  @Subscription(() => Number, {
    filter(
      payload: UnreadNotificationsCountUpdatedPayload,
      _,
      context: IGraphQLContext,
    ) {
      return notificationCountFilter(payload, context);
    },
    resolve: (payload: UnreadNotificationsCountUpdatedPayload) => payload.count,
  })
  public notificationUnreadCountUpdated(
    @Args('input', { type: () => UnreadNotificationsCountUpdatedInput }) _,
  ) {
    return this.pubSub.asyncIterableIterator('unreadNotificationsCountUpdated');
  }
}
