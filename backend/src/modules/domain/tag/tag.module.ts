import { Module } from '@nestjs/common';

import { PubSubModule } from '@/lib/pub-sub/pub-sub.module';

import { TagResolvers } from './resolvers';
import { TagService } from './tag.service';
import { TagLoader } from './tag.loader';

@Module({
  imports: [PubSubModule],
  providers: [...TagResolvers, TagService, TagLoader],
  exports: [TagLoader],
})
export class TagModule {}
