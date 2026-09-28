import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { PubSubModule } from '@/lib/pub-sub/pub-sub.module';

import { CardComment } from './entities/card-comment.entity';
import { CardCommentResolvers } from './resolvers';
import { CardCommentService } from './card-comment.service';
import { CardCommentLoader } from './card-comment.loader';

@Module({
  imports: [PubSubModule, MikroOrmModule.forFeature([CardComment])],
  providers: [...CardCommentResolvers, CardCommentService, CardCommentLoader],
})
export class CardCommentModule {}
