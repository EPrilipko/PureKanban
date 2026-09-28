import { IGraphQLContext } from '@/common/interfaces/context.interface';

export class ByBoardMembersPayload {
  boardMemberIds!: number[];
}

export const byBoardMembers = (
  payload: ByBoardMembersPayload,
  context: IGraphQLContext,
) => {
  const currentUser = context.req.user;

  if (currentUser) {
    return payload.boardMemberIds.includes(currentUser.id);
  }

  return false;
};
