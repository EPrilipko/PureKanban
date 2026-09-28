import { Card, PartialCard } from '@/modules/domain/card/entities/card.entity';

export class CardUpdatedEvent {
  public static EVENT_TYPE = 'cardHistory:card_updated';

  public constructor(
    public readonly actorId: number,
    public readonly card: Card,
    public readonly beforeCard: PartialCard,
    public readonly afterCard: PartialCard,
  ) {}
}
