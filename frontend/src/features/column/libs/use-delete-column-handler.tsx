import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMutation } from '@apollo/client/react';

import { DELETE_COLUMN } from '@/entities/column';

export const useDeleteColumnHandler = (boardId: string) => {
  const [deleteColumnMutation] = useMutation(DELETE_COLUMN);

  const deleteColumn = (columnId: string) => {
    deleteColumnMutation({
      variables: { boardId, id: columnId },
      update: (cache, result) => {
        const deletedColumn = result.data?.deleteColumn;

        if (deletedColumn) {
          cache.evict({ id: cache.identify(deletedColumn) });
          cache.gc();
        }
      },
    });
  };

  const openDeleteColumnModal = (columnId: string) =>
    modals.openConfirmModal({
      title: 'Вы хотите удалить колонку?',
      children: (
        <Text size="sm">Вы потеряете все привязанные к колонке картчоки. Вы в этом уверены?</Text>
      ),
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      onConfirm: () => deleteColumn(columnId),
    });

  return {
    openDeleteColumnModal,
  };
};
