import { defineEntity, p } from '@mikro-orm/core';

import { Tag } from '@/modules/domain/tag/entities/tag.entity';

import { Card } from './card.entity';

export const CardTagSchema = defineEntity({
  name: 'CardTag',
  properties: {
    card: () => p.manyToOne(Card).primary(),
    tag: () => p.manyToOne(Tag).primary(),
  },
  triggers: [
    {
      name: 'trigger_card_tags_changed',
      events: ['insert', 'update', 'delete'],
      timing: 'after',
      body: `
        IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
          PERFORM kanban.fn_refresh_card_search_vector(NEW.card_id);
        ELSIF TG_OP = 'DELETE' THEN
          PERFORM kanban.fn_refresh_card_search_vector(OLD.card_id);
        END IF;
        RETURN NULL`,
    },
  ],
});

export class CardTag extends CardTagSchema.class {}
CardTagSchema.setClass(CardTag);
