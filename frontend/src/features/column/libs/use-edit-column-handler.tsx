import { useMutation } from '@apollo/client/react';
import { modals } from '@mantine/modals';

import { ColumnFormVisual, type ColumnRenderFragment, UPDATE_COLUMN } from '@/entities/column';

export const useEditColumnHandler = (boardId: string) => {
  const [updateColumnMutation] = useMutation(UPDATE_COLUMN);

  const openEditColumnModal = (column: ColumnRenderFragment) =>
    modals.open({
      title: 'Редактировать колонку',
      children: <ColumnFormVisual state="edit" column={column} submit={editColumn} />,
    });

  const editColumn = async (values: ColumnRenderFragment) => {
    await updateColumnMutation({
      variables: {
        input: {
          boardId,
          ...values,
        },
      },
    });
  };

  return { openEditColumnModal };
};
