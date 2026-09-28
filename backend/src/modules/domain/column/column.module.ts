import { Module } from '@nestjs/common';

import { LexorankModule } from '@/lib/lexorank';
import { PubSubModule } from '@/lib/pub-sub/pub-sub.module';

import { NotificationModule } from '@/modules/domain/notification/notification.module';

import { ColumnResolvers } from './resolvers';
import { ColumnService } from './column.service';
import { ColumnLoader } from './column.loader';
import { ColumnSubscriber } from './column.subscriber';

@Module({
  imports: [LexorankModule, PubSubModule, NotificationModule],
  providers: [
    ...ColumnResolvers,
    ColumnService,
    ColumnLoader,
    ColumnSubscriber,
  ],
})
export class ColumnModule {}
