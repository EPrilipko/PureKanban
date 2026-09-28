import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ConfigConfiguredModule } from '@/config/config.configured';
import { GraphqlConfiguredModule } from '@/config/graphql.configured';
import { MikroORMConfiguredModule } from '@/config/db.configured';
import { EventEmitterConfiguredModule } from '@/config/event-emitter.configured';
import { PubSubModule } from '@/lib/pub-sub/pub-sub.module';

import { AuthModule, GqlJWTAuthGuard } from '@/modules/auth';
import { BoardModule } from '@/modules/domain/board';
import { ColumnModule } from '@/modules/domain/column';
import { CardModule } from '@/modules/domain/card';
import { TagModule } from '@/modules/domain/tag';
import { NotificationModule } from '@/modules/domain/notification';

@Module({
  imports: [
    ConfigConfiguredModule,
    GraphqlConfiguredModule,
    MikroORMConfiguredModule,
    EventEmitterConfiguredModule,
    PubSubModule,
    AuthModule,
    BoardModule,
    ColumnModule,
    CardModule,
    TagModule,
    NotificationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlJWTAuthGuard,
    },
  ],
})
export class AppModule {}
