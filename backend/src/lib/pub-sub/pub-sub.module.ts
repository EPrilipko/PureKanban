import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
  exports: [PubSub],
})
export class PubSubModule {}
