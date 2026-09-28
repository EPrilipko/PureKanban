import { ResolveField, Resolver, Parent } from '@nestjs/graphql';

import { Board } from '@/modules/domain/board/entities/board.entity';

import { Tag } from '../entities/tag.entity';
import { TagLoader } from '../tag.loader';

@Resolver(() => Board)
export class BoardTagsResolver {
  public constructor(private readonly tagsLoader: TagLoader) {}

  @ResolveField(() => [Tag])
  public async tags(@Parent() board: Board): Promise<Tag[]> {
    return this.tagsLoader.batchByBoardId.load(board.id);
  }
}
