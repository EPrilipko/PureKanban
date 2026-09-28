import { ByCardPayload } from '@/common/graphql/filters/byCard';

import { CardComment } from '../entities/card-comment.entity';

export class CardCommentSubscriptionPayload extends ByCardPayload {
  comment!: CardComment;
}
