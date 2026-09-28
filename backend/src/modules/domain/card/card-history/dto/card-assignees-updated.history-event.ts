import { User } from '@/modules/auth/user/entities/user.entity';
import { Card } from '@/modules/domain/card/entities/card.entity';

export class CardAssigneesUpdatedEvent {
  public static EVENT_TYPE = 'cardHistory:assignees_updated';

  public constructor(
    public readonly actorId: number,
    public readonly card: Card,
    public readonly beforeAssignees: User[],
    public readonly afterAssignees: User[],
  ) {}
}
