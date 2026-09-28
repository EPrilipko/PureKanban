import { User } from '@/modules/auth/user/entities/user.entity';
import { Card } from '@/modules/domain/card/entities/card.entity';

export class CardOwnerUpdatedEvent {
  public static EVENT_TYPE = 'cardHistory:owner_updated';

  public constructor(
    public readonly actorId: number,
    public readonly card: Card,
    public readonly beforeOwner: User | null,
    public readonly afterOwner: User | null,
  ) {}
}
