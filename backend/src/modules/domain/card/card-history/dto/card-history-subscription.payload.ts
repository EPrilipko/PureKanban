import { ByCardPayload } from '@/common/graphql/filters/byCard';

import { CardHistory } from '../entities/card-history.entity';

export class CardHistorySubscriptionPayload extends ByCardPayload {
  history!: CardHistory;
}
