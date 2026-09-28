import { modals } from '@mantine/modals';

import { type BoardMembersFragment } from '@/entities/board';

import { BoardMembersForm } from '../ui';

export const useBoardMembersModal = () => {
  const openBoardMembersModal = (board: BoardMembersFragment) =>
    modals.open({
      title: 'Участники доски',
      children: <BoardMembersForm board={board} />,
    });

  return { openBoardMembersModal };
};
