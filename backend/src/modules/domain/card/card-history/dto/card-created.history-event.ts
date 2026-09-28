import { Card } from '@/modules/domain/card/entities/card.entity';

export class CardCreatedEvent {
  public static EVENT_TYPE = 'cardHistory:created';

  constructor(
    public readonly card: Card,
    public readonly actorId: number,
  ) {}
}
