import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Public, GqlWsAuthGuard } from '@/modules/auth';

import { byCard } from '@/common/graphql/filters/byCard';

import { CardHistory } from '../entities/card-history.entity';
import {
  CardHistorySubscriptionInput,
  CardHistorySubscriptionPayload,
} from '../dto';

@Resolver(() => CardHistory)
export class CardHistoryResolver {
  public constructor(private readonly pubSub: PubSub) {}

  @Public()
  @UseGuards(GqlWsAuthGuard)
  @Subscription(() => CardHistory, {
    filter(
      payload: CardHistorySubscriptionPayload,
      variables: { input: CardHistorySubscriptionInput },
    ) {
      return byCard(payload, variables);
    },
    resolve(payload: CardHistorySubscriptionPayload) {
      return payload.history;
    },
  })
  public historyCreated(
    @Args('input', { type: () => CardHistorySubscriptionInput }) _,
  ) {
    return this.pubSub.asyncIterableIterator('cardHistoryCreated');
  }
}
