import {
  Cascade,
  Collection,
  defineEntity,
  OptionalProps,
  p,
} from '@mikro-orm/core';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { GraphQLDateTime, GraphQLHexColorCode } from 'graphql-scalars';

import { Board } from '@/modules/domain/board/entities/board.entity';
import { Card } from '@/modules/domain/card/entities/card.entity';

export const ColumnSchema = defineEntity({
  name: 'Column',
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => v4()),
    rank: p.string().index(),
    name: p.string(),
    color: p.string(),
    board: () => p.manyToOne(Board).inversedBy('columns').deleteRule('cascade'),
    cards: () => p.oneToMany(Card).mappedBy('column').cascade(Cascade.REMOVE),
    maxCardsCount: p.integer().nullable(),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
  },
  uniques: [{ properties: ['board', 'rank'], name: 'unique_rank_per_board' }],
  checks: [
    {
      name: `max_card_counts_limit`,
      expression: (columns) => `${columns.maxCardsCount} >= 1`,
    },
  ],
});

@ObjectType()
export class Column extends ColumnSchema.class {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Field(() => ID)
  id!: string;

  @Field()
  rank!: string;

  @Field()
  name!: string;

  @Field(() => GraphQLHexColorCode)
  color!: string;

  @Field(() => Board)
  board!: Board;

  @Field(() => [Card])
  cards = new Collection<Card>(this);

  @Field(() => Int, { nullable: true })
  maxCardsCount!: number | null;

  @Field(() => GraphQLDateTime)
  createdAt!: Date;

  @Field(() => GraphQLDateTime)
  updatedAt!: Date;
}

ColumnSchema.setClass(Column);
