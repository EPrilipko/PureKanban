import { ByBoardPayload } from '@/common/graphql/filters/byBoard';

import { Card } from '../entities/card.entity';

export class CardSubscriptionPayload extends ByBoardPayload {
  card!: Card;
}
