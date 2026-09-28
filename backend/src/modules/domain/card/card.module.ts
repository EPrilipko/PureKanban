import { Module } from '@nestjs/common';

import { LexorankModule } from '@/lib/lexorank';
import { PubSubModule } from '@/lib/pub-sub/pub-sub.module';

import { CardCommentModule } from '@/modules/domain/card/card-comment';
import { CardHistoryModule } from '@/modules/domain/card/card-history';

import { CardResolvers } from './resolvers';
import { CardService } from './card.service';
import { CardLoader } from './card.loader';

@Module({
  imports: [CardCommentModule, CardHistoryModule, LexorankModule, PubSubModule],
  providers: [...CardResolvers, CardService, CardLoader],
})
export class CardModule {}
