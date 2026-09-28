import { Card } from '@/modules/domain/card/entities/card.entity';
import { CardComment } from '@/modules/domain/card/card-comment/entities/card-comment.entity';

export class CardCommentCreatedEvent {
  public static EVENT_TYPE = 'cardHistory:comment_created';

  public constructor(
    public readonly actorId: number,
    public readonly card: Card,
    public readonly comment: CardComment,
  ) {}
}
