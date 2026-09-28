import {
  Cascade,
  Collection,
  defineEntity,
  OptionalProps,
  p,
} from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLDateTime, GraphQLHexColorCode } from 'graphql-scalars';

import { nanoid } from '@/lib/nanoid';

import { Column } from '@/modules/domain/column/entities/column.entity';
import { Card } from '@/modules/domain/card/entities/card.entity';
import { Tag } from '@/modules/domain/tag/entities/tag.entity';
import { Notification } from '@/modules/domain/notification/entities/notification.entity';

import { BoardMember } from '../board-member/entities/board-member.entity';

export const BoardSchema = defineEntity({
  name: 'Board',
  properties: {
    id: p
      .string()
      .primary()
      .onCreate(() => nanoid()),
    name: p.string(),
    color: p.string(),
    columns: () =>
      p.oneToMany(Column).mappedBy('board').cascade(Cascade.REMOVE),
    cards: () => p.oneToMany(Card).mappedBy('board').cascade(Cascade.REMOVE),
    tags: () => p.oneToMany(Tag).mappedBy('board').cascade(Cascade.REMOVE),
    boardMembers: () =>
      p.oneToMany(BoardMember).mappedBy('board').cascade(Cascade.REMOVE),
    notifications: () =>
      p.oneToMany(Notification).mappedBy('board').cascade(Cascade.REMOVE),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
  },
});

@ObjectType()
export class Board extends BoardSchema.class {
  [OptionalProps]?: 'boardMembers' | 'createdAt' | 'updatedAt';

  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => GraphQLHexColorCode)
  color!: string;

  @Field(() => [Column])
  columns = new Collection<Column>(this);

  @Field(() => [Card])
  cards = new Collection<Card>(this);

  @Field(() => [Tag])
  tags = new Collection<Tag>(this);

  @Field(() => [BoardMember])
  boardMembers = new Collection<BoardMember>(this);

  @Field(() => GraphQLDateTime)
  createdAt!: Date;

  @Field(() => GraphQLDateTime)
  updatedAt!: Date;
}

BoardSchema.setClass(Board);
