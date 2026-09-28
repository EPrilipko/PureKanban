import { BoardMemberResolver } from './board-member.resolver';
import { BoardBoardMembersResolver } from './board.board-members.resolver';
import { UserBoardMembersLoader } from './user.board-members.resolver';

export const BoardMemberResolvers = [
  BoardMemberResolver,
  BoardBoardMembersResolver,
  UserBoardMembersLoader,
];
