import { useCallback } from 'react';
import { useSuspenseQuery } from '@apollo/client/react';

import { BoardMemberRole } from '@/entities/board-member';

import { WHO_AM_I } from '../api';

export const useUser = () => {
  const { data } = useSuspenseQuery(WHO_AM_I);

  const user = data.whoAmI;

  const canEditBoard = useCallback(
    (boardId: string) =>
      user.boardMemberships.some(
        (boardMember) =>
          boardMember.board.id === boardId &&
          (boardMember.role === BoardMemberRole.Author ||
            boardMember.role === BoardMemberRole.Admin),
      ),
    [user],
  );

  return {
    user,
    canEditBoard,
  };
};
