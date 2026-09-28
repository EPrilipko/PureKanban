import { useCallback } from 'react';
import { useSuspenseQuery, useMutation } from '@apollo/client/react';
import type { ComboboxItem, SelectProps } from '@mantine/core';

import { useUser } from '@/entities/session';
import {
  CREATE_BOARD_MEMBER,
  UPDATE_BOARD_MEMBER,
  DELETE_BOARD_MEMBER,
  BoardMemberRole,
} from '@/entities/board-member';

import { BOARD_MEMBERS_SELECT_DATA } from '../api';

export const useBoardMembersForm = (boardId: string) => {
  const { user: loginUser } = useUser();

  const {
    data: {
      board: { boardMembers },
    },
  } = useSuspenseQuery(BOARD_MEMBERS_SELECT_DATA, { variables: { boardId } });

  const [createBoardMemberMutation] = useMutation(CREATE_BOARD_MEMBER);
  const [updateBoardMemberMutation] = useMutation(UPDATE_BOARD_MEMBER);
  const [deleteBoardMemberMutation] = useMutation(DELETE_BOARD_MEMBER);

  const filterUsers: SelectProps<number>['filter'] = useCallback(
    ({ options }) => {
      const boardMembersSet = new Set(boardMembers.map((boardMember) => boardMember.user.id));

      return (options as ComboboxItem<number>[]).filter(
        (option) => !boardMembersSet.has(option.value) && option.value !== loginUser.id,
      );
    },
    [boardMembers, loginUser],
  );

  const createBoardMember = async (userId: number | null) => {
    if (userId) {
      await createBoardMemberMutation({
        variables: { input: { userId, boardId, role: BoardMemberRole.User } },
      });
    }
  };

  const updateBoardMember = async (userId: number, role: BoardMemberRole) => {
    await updateBoardMemberMutation({ variables: { input: { userId, boardId, role } } });
  };

  const deleteBoardMember = async (userId: number) => {
    await deleteBoardMemberMutation({
      variables: { input: { userId, boardId } },
      update: (cache, result) => {
        const deletedBoardMember = result.data?.deleteBoardMember;

        if (deletedBoardMember) {
          cache.evict({ id: cache.identify(deletedBoardMember) });
          cache.gc();
        }
      },
    });
  };

  return {
    boardMembers,
    createBoardMember,
    updateBoardMember,
    deleteBoardMember,
    filterUsers,
  };
};
