import { Ref } from '@mikro-orm/core';

import { User } from '@/modules/auth/user/entities/user.entity';
import { Card } from '@/modules/domain/card/entities/card.entity';

export class CardOwnerChangedEvent {
  public static EVENT_TYPE = 'card:owner_changed';

  constructor(
    public readonly actor: User | Ref<User>,
    public readonly card: Card,
    public readonly prevOwner: User | null,
  ) {}
}
