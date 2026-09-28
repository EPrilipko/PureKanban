import { defineEntity, p, OptionalProps } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { GraphQLDateTime } from 'graphql-scalars';

import { CursorPaginated } from '@/lib/pagination/cursor';

import { Card } from '@/modules/domain/card/entities/card.entity';
import { User } from '@/modules/auth/user/entities/user.entity';

export const CardCommentSchema = defineEntity({
  name: 'CardComment',
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => v4()),
    card: () => p.manyToOne(Card).inversedBy('comments').deleteRule('cascade'),
    user: () => p.manyToOne(User).inversedBy('comments'),
    text: p.string(),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
  },
});

@ObjectType()
export class CardComment extends CardCommentSchema.class {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Field(() => ID)
  id!: string;

  @Field(() => Card)
  card!: Card;

  @Field(() => User)
  user!: User;

  @Field()
  text!: string;

  @Field(() => GraphQLDateTime)
  createdAt!: Date;

  @Field(() => GraphQLDateTime)
  updatedAt!: Date;
}

CardCommentSchema.setClass(CardComment);

@ObjectType()
export class CardCommentPaginated extends CursorPaginated(CardComment) {}
