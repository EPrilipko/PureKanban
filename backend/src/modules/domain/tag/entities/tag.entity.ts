import { Collection, defineEntity, OptionalProps, p } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { GraphQLDateTime, GraphQLHexColorCode } from 'graphql-scalars';

import { Card } from '@/modules/domain/card/entities/card.entity';
import { Board } from '@/modules/domain/board/entities/board.entity';

export const TagSchema = defineEntity({
  name: 'Tag',
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => v4()),
    name: p.string(),
    color: p.string(),
    board: () => p.manyToOne(Board).inversedBy('tags').deleteRule('cascade'),
    cards: () => p.manyToMany(Card).mappedBy('tags'),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
  },
  triggers: [
    {
      name: 'trigger_tag_name_changed',
      events: ['update'],
      timing: 'after',
      body: `
        IF OLD.name IS DISTINCT FROM NEW.name THEN
          DECLARE
            r RECORD;
          BEGIN
            FOR r IN SELECT card_id FROM kanban.card_tag WHERE tag_id = NEW.id LOOP
              PERFORM kanban.fn_refresh_card_search_vector(r.card_id);
            END LOOP;
          END;
        END IF;
        RETURN NULL`,
    },
  ],
});

@ObjectType()
export class Tag extends TagSchema.class {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => GraphQLHexColorCode)
  color!: string;

  @Field(() => Board)
  board!: Board;

  @Field(() => [Card])
  cards = new Collection<Card>(this);

  @Field(() => GraphQLDateTime)
  createdAt!: Date;

  @Field(() => GraphQLDateTime)
  updatedAt!: Date;
}

TagSchema.setClass(Tag);
