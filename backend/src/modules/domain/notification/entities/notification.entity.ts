import { User } from '@/modules/auth/user/entities/user.entity';
import { defineEntity, OptionalProps, p } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Board } from '../../board/entities/board.entity';
import {
  ObjectType,
  Field,
  ID,
  registerEnumType,
  InterfaceType,
} from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-scalars';
import { Card } from '../../card/entities/card.entity';

export enum NotificationType {
  CardOwnerAdded = 'CardOwnerAdded',
  CardOwnerRemoved = 'CardOwnerRemoved',
  CardAssigneesAdded = 'CardAssigneesAdded',
  CardAssigneesRemoved = 'CardAssigneesRemoved',
}

registerEnumType(NotificationType, { name: 'NotificationType' });

export const NotificationSchema = defineEntity({
  name: 'Notification',
  discriminatorColumn: 'type',
  abstract: true,
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => v4()),
    type: () => p.enum(NotificationType),
    isRead: p.boolean().default(false),
    actor: () => p.manyToOne(User).inversedBy('authoredNotifications'),
    recipient: () => p.manyToOne(User).inversedBy('participatedNotifications'),
    board: () =>
      p.manyToOne(Board).inversedBy('notifications').deleteRule('cascade'),
    createdAt: p.datetime().onCreate(() => new Date()),
  },
});

const CardOwnerAddedNotificationSchema = defineEntity({
  name: 'CardOwnerAddedNotification',
  extends: NotificationSchema,
  discriminatorValue: NotificationType.CardOwnerAdded,
  properties: {
    card: () => p.manyToOne(Card).nullable().deleteRule('cascade'),
  },
});

const CardOwnerRemovedNotificationSchema = defineEntity({
  name: 'CardOwnerRemovedNotification',
  extends: NotificationSchema,
  discriminatorValue: NotificationType.CardOwnerRemoved,
  properties: {
    card: () => p.manyToOne(Card).nullable().deleteRule('cascade'),
  },
});

const CardAssigneesAddedNotificationSchema = defineEntity({
  name: 'CardAssigneesAddedNotification',
  extends: NotificationSchema,
  discriminatorValue: NotificationType.CardAssigneesAdded,
  properties: {
    card: () => p.manyToOne(Card).nullable().deleteRule('cascade'),
  },
});

const CardAssigneesRemovedNotificationSchema = defineEntity({
  name: 'CardAssigneesRemovedNotification',
  extends: NotificationSchema,
  discriminatorValue: NotificationType.CardAssigneesRemoved,
  properties: {
    card: () => p.manyToOne(Card).nullable().deleteRule('cascade'),
  },
});

@InterfaceType({
  resolveType: (value: Notification) => {
    switch (value.type) {
      case NotificationType.CardOwnerAdded:
        return CardOwnerAddedNotification;
      case NotificationType.CardOwnerRemoved:
        return CardOwnerRemovedNotification;
      case NotificationType.CardAssigneesAdded:
        return CardAssigneesAddedNotification;
      case NotificationType.CardAssigneesRemoved:
        return CardAssigneesRemovedNotification;
    }
  },
})
export class Notification extends NotificationSchema.class {
  [OptionalProps]?: 'createdAt' | 'isRead' | 'type';

  @Field(() => ID)
  id!: string;

  @Field(() => NotificationType)
  type!: NotificationType;

  @Field(() => Boolean)
  isRead!: boolean;

  @Field(() => User)
  actor!: User;

  @Field(() => User)
  recipient!: User;

  @Field(() => Board)
  board!: Board;

  @Field(() => GraphQLDateTime)
  createdAt!: Date;
}
NotificationSchema.setClass(Notification);

@ObjectType({ implements: () => Notification })
export class CardOwnerAddedNotification
  extends CardOwnerAddedNotificationSchema.class
{
  @Field(() => Card)
  card!: Card;
}
CardOwnerAddedNotificationSchema.setClass(CardOwnerAddedNotification);

@ObjectType({ implements: () => Notification })
export class CardOwnerRemovedNotification
  extends CardOwnerRemovedNotificationSchema.class
{
  @Field(() => Card)
  card!: Card;
}
CardOwnerRemovedNotificationSchema.setClass(CardOwnerRemovedNotification);

@ObjectType({ implements: () => Notification })
export class CardAssigneesAddedNotification
  extends CardAssigneesAddedNotificationSchema.class
{
  @Field(() => Card)
  card!: Card;
}
CardAssigneesAddedNotificationSchema.setClass(CardAssigneesAddedNotification);

@ObjectType({ implements: () => Notification })
export class CardAssigneesRemovedNotification
  extends CardAssigneesRemovedNotificationSchema.class
{
  @Field(() => Card)
  card!: Card;
}
CardAssigneesRemovedNotificationSchema.setClass(
  CardAssigneesRemovedNotification,
);
