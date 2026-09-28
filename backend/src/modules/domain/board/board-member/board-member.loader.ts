import { Injectable, Scope } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';

import { BoardMember } from './entities/board-member.entity';

@Injectable({ scope: Scope.REQUEST })
export class BoardMemberLoader {
  public constructor(private readonly em: EntityManager) {}

  public batchByBoardId = new DataLoader<string, BoardMember[]>(
    async (boardIds: readonly string[]) => {
      const em = this.em.fork();

      const boardMembers = await em.findAll(BoardMember, {
        where: { board: { id: { $in: boardIds } } },
      });

      const boardMembersMap = new Map<string, BoardMember[]>();
      boardMembers.forEach((boardMember) => {
        const boardMembersItems =
          boardMembersMap.get(boardMember.board.id) || [];
        boardMembersItems.push(boardMember);
        boardMembersMap.set(boardMember.board.id, boardMembersItems);
      });

      return boardIds.map((boardId) => boardMembersMap.get(boardId) || []);
    },
  );

  public batchByUserId = new DataLoader<number, BoardMember[]>(
    async (userIds: readonly number[]) => {
      const em = this.em.fork();

      const boardMembers = await em.findAll(BoardMember, {
        where: { user: { id: { $in: userIds } } },
      });

      const boardMembersMap = new Map<number, BoardMember[]>();
      boardMembers.forEach((boardMember) => {
        const boardMemberItems = boardMembersMap.get(boardMember.user.id) || [];
        boardMemberItems.push(boardMember);
        boardMembersMap.set(boardMember.user.id, boardMemberItems);
      });

      return userIds.map((userId) => boardMembersMap.get(userId) || []);
    },
  );
}
