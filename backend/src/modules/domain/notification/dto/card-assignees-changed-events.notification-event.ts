import { Ref } from '@mikro-orm/core';

import { User } from '@/modules/auth/user/entities/user.entity';
import { Card } from '@/modules/domain/card/entities/card.entity';

export class CardAssigneesChangedEvent {
  public static EVENT_TYPE = 'card:assignees_changed';

  constructor(
    public readonly actor: User | Ref<User>,
    public readonly card: Card,
    public readonly prevAssignees: User[],
  ) {}
}
