import { Module } from '@nestjs/common';

import { PubSubModule } from '@/lib/pub-sub/pub-sub.module';

import { BoardMemberModule } from './board-member';

import { BoardResolvers } from './resolvers';
import { BoardService } from './board.service';
import { BoardLoader } from './board.loader';

@Module({
  imports: [BoardMemberModule, PubSubModule],
  providers: [...BoardResolvers, BoardService, BoardLoader],
})
export class BoardModule {}
