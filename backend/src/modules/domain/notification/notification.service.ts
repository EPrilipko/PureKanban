import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PubSub } from 'graphql-subscriptions';

import { Board } from '@/modules/domain/board/entities/board.entity';

import {
  Notification,
  NotificationType,
  CardOwnerAddedNotification,
  CardOwnerRemovedNotification,
  CardAssigneesAddedNotification,
  CardAssigneesRemovedNotification,
} from './entities/notification.entity';
import {
  CardOwnerChangedEvent,
  CardAssigneesChangedEvent,
  NotificationSubscriptionPayload,
  UnreadNotificationsCountUpdatedPayload,
} from './dto';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class NotificationService {
  public constructor(
    private readonly em: EntityManager,
    private readonly pubSub: PubSub,
    @InjectRepository(Notification)
    private readonly notificationRepository: EntityRepository<Notification>,
  ) {}

  @OnEvent(CardOwnerChangedEvent.EVENT_TYPE)
  public async onCardOwnerChanged(payload: CardOwnerChangedEvent) {
    const { card, prevOwner, actor } = payload;

    const board = await this.em.findOneOrFail(Board, card.board.id, {
      populate: ['boardMembers:ref'],
    });

    const notifications: Notification[] = [];
    if (prevOwner) {
      notifications.push(
        this.em.create(CardOwnerRemovedNotification, {
          type: NotificationType.CardOwnerRemoved,
          actor: actor.id,
          recipient: prevOwner.id,
          board: card.board.id,
          card,
        }),
      );
    }
    if (card.owner) {
      notifications.push(
        this.em.create(CardOwnerAddedNotification, {
          type: NotificationType.CardOwnerAdded,
          actor: actor.id,
          recipient: card.owner.id,
          board: card.board.id,
          card,
        }),
      );
    }

    await this.em.persist(notifications).flush();

    await Promise.all(
      notifications.flatMap((notification) => [
        this.pubSub.publish('notificationCreated', {
          boardMemberIds: board.boardMembers.map(
            (boardMember) => boardMember.user.id,
          ),
          notification,
        } satisfies NotificationSubscriptionPayload),
        this.flushUnreadCountUpdate(notification.recipient.id, card.board.id),
      ]),
    );
  }

  @OnEvent(CardAssigneesChangedEvent.EVENT_TYPE)
  public async onAssigneesChanged(payload: CardAssigneesChangedEvent) {
    const { card, prevAssignees, actor } = payload;

    const board = await this.em.findOneOrFail(Board, card.board.id, {
      populate: ['boardMembers:ref'],
    });

    const notifications: Notification[] = [];

    const prevAssigneesSet = new Set(prevAssignees?.map((a) => a.id));
    const currAssigneesSet = new Set(card.assignees?.map((a) => a.id));
    const addedAssignees = card.assignees.filter(
      (a) => !prevAssigneesSet.has(a.id),
    );
    const removedAssignees = prevAssignees?.filter(
      (a) => !currAssigneesSet.has(a.id),
    );

    addedAssignees.forEach((assignee) => {
      notifications.push(
        this.em.create(CardAssigneesAddedNotification, {
          type: NotificationType.CardAssigneesAdded,
          actor: actor.id,
          recipient: assignee,
          board: card.board.id,
          card,
        }),
      );
    });
    removedAssignees?.forEach((assignee) => {
      notifications.push(
        this.em.create(CardAssigneesRemovedNotification, {
          type: NotificationType.CardAssigneesRemoved,
          actor: actor.id,
          recipient: assignee,
          board: card.board.id,
          card,
        }),
      );
    });

    await this.em.persist(notifications).flush();

    await Promise.all(
      notifications.flatMap((notification) => [
        this.pubSub.publish('notificationCreated', {
          boardMemberIds: board.boardMembers.map(
            (boardMember) => boardMember.user.id,
          ),
          notification,
        } satisfies NotificationSubscriptionPayload),
        this.flushUnreadCountUpdate(notification.recipient.id, card.board.id),
      ]),
    );
  }

  public async readOne(id: string): Promise<Notification> {
    const notification = await this.em.findOneOrFail(Notification, id, {
      populate: ['*'],
    });
    const board = await this.em.findOneOrFail(Board, notification.board.id, {
      populate: ['boardMembers:ref'],
    });

    notification.isRead = true;

    await this.em.flush();

    await Promise.all([
      this.pubSub.publish('notificationUpdated', {
        boardMemberIds: board.boardMembers.map(
          (boardMember) => boardMember.user.id,
        ),
        notification,
      } satisfies NotificationSubscriptionPayload),
      this.flushUnreadCountUpdate(
        notification.recipient.id,
        notification.board.id,
      ),
    ]);

    return notification;
  }

  public countUnread(userId: number, boardId: string): Promise<number> {
    return this.notificationRepository.count({
      recipient: userId,
      board: boardId,
      isRead: false,
    });
  }

  public async flushUnreadCountUpdate(userId: number, boardId: string) {
    const count = await this.countUnread(userId, boardId);

    await this.pubSub.publish('unreadNotificationsCountUpdated', {
      userId,
      count,
    } satisfies UnreadNotificationsCountUpdatedPayload);
  }
}
