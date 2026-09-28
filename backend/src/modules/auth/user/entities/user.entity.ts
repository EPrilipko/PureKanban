import { Collection, defineEntity, OptionalProps, p } from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDateTime, GraphQLEmailAddress } from 'graphql-scalars';

import { UserSession } from '@/modules/auth/user-session/entities/user-session.entity';
import { BoardMember } from '@/modules/domain/board/board-member/entities/board-member.entity';
import { Card } from '@/modules/domain/card/entities/card.entity';
import { CardComment } from '@/modules/domain/card/card-comment/entities/card-comment.entity';
import { Notification } from '@/modules/domain/notification/entities/notification.entity';

export const UserSchema = defineEntity({
  name: 'User',
  properties: {
    id: p.integer().primary(),
    firstName: p.string(),
    lastName: p.string(),
    email: p.string(),
    passwordHash: p.string(),
    sessions: () => p.oneToMany(UserSession).mappedBy('user'),
    ownedCards: () => p.oneToMany(Card).mappedBy('owner'),
    assignedCards: () => p.manyToMany(Card).mappedBy('assignees'),
    boardMemberships: () => p.oneToMany(BoardMember).mappedBy('user'),
    comments: () => p.oneToMany(CardComment).mappedBy('user'),
    authoredNotifications: () => p.oneToMany(Notification).mappedBy('actor'),
    participatedNotifications: () =>
      p.oneToMany(Notification).mappedBy('recipient'),
    createdAt: p.datetime().onCreate(() => new Date()),
  },
});

@ObjectType()
export class User extends UserSchema.class {
  [OptionalProps]?: 'boardMembership' | 'session' | 'createdAt';

  @Field(() => Int)
  id!: number;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field(() => GraphQLEmailAddress)
  email!: string;

  @Field()
  passwordHash!: string;

  @Field(() => [UserSession])
  sessions = new Collection<UserSession>(this);

  @Field(() => [BoardMember])
  boardMemberships = new Collection<BoardMember>(this);

  @Field(() => GraphQLDateTime)
  createdAt!: Date;
}

UserSchema.setClass(User);
