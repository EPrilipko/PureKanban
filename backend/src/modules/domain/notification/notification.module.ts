import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { PubSubModule } from '@/lib/pub-sub/pub-sub.module';

import { Notification } from './entities/notification.entity';
import { NotificationResolvers } from './resolvers';
import { NotificationService } from './notification.service';

@Module({
  imports: [PubSubModule, MikroOrmModule.forFeature([Notification])],
  providers: [...NotificationResolvers, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
