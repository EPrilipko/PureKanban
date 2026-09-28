import { useMutation } from '@apollo/client/react';

import { BoardForm, type BoardRenderFragment, UPDATE_BOARD } from '@/entities/board';
import { modals } from '@mantine/modals';

const MODAL_ID = 'edit_board';

export const useEditBoardHandler = () => {
  const [updateBoardMutation] = useMutation(UPDATE_BOARD);

  const openEditBoardModal = (board: BoardRenderFragment) =>
    modals.open({
      modalId: MODAL_ID,
      title: 'Редактировать доску',
      children: <BoardForm state="edit" board={board} submit={editBoard} />,
    });

  const editBoard = async (values: BoardRenderFragment) => {
    await updateBoardMutation({
      variables: {
        input: {
          boardId: values.id,
          ...values,
        },
      },
    });
    modals.close(MODAL_ID);
  };

  return { openEditBoardModal };
};
