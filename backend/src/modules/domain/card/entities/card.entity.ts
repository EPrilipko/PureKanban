import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  defineEntity,
  p,
  OptionalProps,
  Collection,
  Cascade,
} from '@mikro-orm/core';
import { GraphQLDateTime } from 'graphql-scalars';

import { nanoid } from '@/lib/nanoid';

import { User } from '@/modules/auth/user/entities/user.entity';
import { Column } from '@/modules/domain/column/entities/column.entity';
import { Board } from '@/modules/domain/board/entities/board.entity';
import { Tag } from '@/modules/domain/tag/entities/tag.entity';
import { Notification } from '@/modules/domain/notification/entities/notification.entity';

import { CardComment } from '../card-comment/entities/card-comment.entity';
import { CardHistory } from '../card-history/entities/card-history.entity';
import { CardTag } from './card-tag.entity';

export const CardSchema = defineEntity({
  name: 'Card',
  properties: {
    id: p
      .string()
      .primary()
      .onCreate(() => nanoid()),
    rank: p.string().index(),
    name: p.string(),
    description: p.string(),
    owner: () => p.manyToOne(User).inversedBy('ownedCards').nullable(),
    assignees: () => p.manyToMany(User).inversedBy('assignedCards'),
    board: () => p.manyToOne(Board).inversedBy('cards').deleteRule('cascade'),
    column: () => p.manyToOne(Column).inversedBy('cards').deleteRule('cascade'),
    comments: () =>
      p.oneToMany(CardComment).mappedBy('card').cascade(Cascade.REMOVE),
    history: () =>
      p.oneToMany(CardHistory).mappedBy('card').cascade(Cascade.REMOVE),
    tags: () => p.manyToMany(Tag).pivotEntity(() => CardTag),
    searchVector: () => p.string().type('tsvector').persist().nullable(),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
  },
  uniques: [{ properties: ['column', 'rank'], name: 'unique_rank_per_column' }],
  indexes: [
    {
      name: 'idx_search_vector',
      properties: ['searchVector'],
      expression: (columns, table, index) =>
        `CREATE INDEX ${index} ON ${table.schema}.${table.name} USING gin(${columns.searchVector})`,
    },
  ],
  triggers: [
    {
      name: `trigger_card_search_update`,
      events: ['insert', 'update'],
      timing: 'after',
      body: `
        IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.name IS DISTINCT FROM NEW.name) THEN
          PERFORM kanban.fn_refresh_card_search_vector(NEW.id);
        END IF;
        RETURN NULL`,
    },
  ],
});

@ObjectType()
export class Card extends CardSchema.class {
  [OptionalProps]?:
    | 'createdAt'
    | 'updatedAt'
    | 'searchVector'
    | 'owner'
    | 'assignees';

  @Field(() => ID)
  id!: string;

  @Field()
  rank!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => User, { nullable: true })
  owner!: User | null;

  @Field(() => [User])
  assignees = new Collection<User>(this);

  @Field(() => Board)
  board!: Board;

  @Field(() => Column)
  column!: Column;

  comments = new Collection<CardComment>(this);

  history = new Collection<CardHistory>(this);

  @Field(() => [Tag])
  tags = new Collection<Tag>(this);

  @Field(() => GraphQLDateTime)
  createdAt!: Date;

  @Field(() => GraphQLDateTime)
  updatedAt!: Date;
}

CardSchema.setClass(Card);

@ObjectType()
export class PartialCard {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[];
}
