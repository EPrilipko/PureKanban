import { Module } from '@nestjs/common';

import { PubSubModule } from '@/lib/pub-sub/pub-sub.module';

import { BoardMemberResolvers } from './resolvers';
import { BoardMemberService } from './board-member.service';
import { BoardMemberLoader } from './board-member.loader';

@Module({
  imports: [PubSubModule],
  providers: [...BoardMemberResolvers, BoardMemberService, BoardMemberLoader],
  exports: [BoardMemberService],
})
export class BoardMemberModule {}
