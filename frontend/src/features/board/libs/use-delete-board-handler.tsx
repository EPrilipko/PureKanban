import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMutation } from '@apollo/client/react';

import { type BoardIdFragment, DELETE_BOARD } from '@/entities/board';

export const useDeleteBoardHandler = () => {
  const [deleteBoardMutation] = useMutation(DELETE_BOARD);

  const deleteBoard = (boardId: string) => {
    deleteBoardMutation({
      variables: { boardId },
      update: (cache, result) => {
        const deletedBoard = result.data?.deleteBoard;

        if (deletedBoard) {
          cache.evict({ id: cache.identify(deletedBoard) });
          cache.gc();
        }
      },
    });
  };

  const openDeleteBoardModal = (board: BoardIdFragment) =>
    modals.openConfirmModal({
      title: 'Вы хотите удалить доску?',
      children: (
        <Text size="sm">
          Вы потеряете все привязанные к доске колонки и картчоки. Вы в этом уверены?
        </Text>
      ),
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      onConfirm: () => deleteBoard(board.id),
    });

  return {
    openDeleteBoardModal,
  };
};
