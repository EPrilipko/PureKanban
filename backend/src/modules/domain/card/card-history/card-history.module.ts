import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { PubSubModule } from '@/lib/pub-sub/pub-sub.module';

import { CardHistoryResolvers } from './resolvers';
import { CardHistoryLoader } from './card-history.loader';
import { CardHistory } from './entities/card-history.entity';
import { CardHistoryService } from './card-history.service';

@Module({
  imports: [PubSubModule, MikroOrmModule.forFeature([CardHistory])],
  providers: [...CardHistoryResolvers, CardHistoryLoader, CardHistoryService],
})
export class CardHistoryModule {}
