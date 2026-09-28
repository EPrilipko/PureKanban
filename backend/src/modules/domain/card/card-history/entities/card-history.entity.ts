import { defineEntity, OptionalProps, p } from '@mikro-orm/core';
import { ID, ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { GraphQLDateTime, GraphQLJSON } from 'graphql-scalars';
import { v4 } from 'uuid';

import { CursorPaginated } from '@/lib/pagination/cursor';

import { Card } from '@/modules/domain/card/entities/card.entity';
import { User } from '@/modules/auth/user/entities/user.entity';

import { CardHistoryPayload } from './card-history-payload.entity';

export enum CardHistoryAction {
  Created = 'Created',
  Updated = 'Updated',
  OwnerUpdated = 'OwnerUpdated',
  AssigneesUpdated = 'AssigneesUpdated',
  CommentAdded = 'CommentAdded',
}

export const CardHistorySchema = defineEntity({
  name: 'CardHistory',
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => v4()),
    author: () => p.manyToOne(User).eager(),
    card: () => p.manyToOne(Card).inversedBy('history').deleteRule('cascade'),
    payload: p.json(),
    createdAt: p.datetime().onCreate(() => new Date()),
  },
});

@ObjectType()
export class CardHistory extends CardHistorySchema.class {
  [OptionalProps]?: 'createdAt';

  @Field(() => ID)
  id!: string;

  @Field(() => User)
  author!: User;

  @Field(() => Card)
  card!: Card;

  @Field(() => GraphQLJSON)
  payload!: typeof CardHistoryPayload;

  @Field(() => GraphQLDateTime)
  createdAt!: Date;
}

CardHistorySchema.setClass(CardHistory);
registerEnumType(CardHistoryAction, {
  name: 'CardHistoryAction',
  description: 'Type of recorded action',
});

@ObjectType()
export class CardHistoryPaginated extends CursorPaginated(CardHistory) {}
