import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EntityManager } from '@mikro-orm/core';

import { Board } from '@/modules/domain/board/entities/board.entity';

import { BoardMember } from '../entities/board-member.entity';
import { BoardMemberLoader } from '../board-member.loader';

@Resolver(() => Board)
export class BoardBoardMembersResolver {
  public constructor(
    private readonly em: EntityManager,
    private readonly boardMemberLoader: BoardMemberLoader,
  ) {}

  @ResolveField(() => [BoardMember])
  public async boardMembers(@Parent() board: Board): Promise<BoardMember[]> {
    this.boardMemberLoader.batchByBoardId.clear(board.id);

    return this.boardMemberLoader.batchByBoardId.load(board.id);
  }
}
