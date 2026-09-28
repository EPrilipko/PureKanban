import { type FC } from 'react';
import { modals } from '@mantine/modals';
import { Button } from '@mantine/core';
import { useMutation } from '@apollo/client/react';
import { IconLibraryPlus } from '@tabler/icons-react';

import { useUser } from '@/entities/session';
import { CREATE_COLUMN, ColumnFormVisual, type ColumnRenderFragment } from '@/entities/column';

interface Props {
  boardId: string;
}

const modalId = 'CREATE_COLUMN_MODAL';

export const CreateColumnButton: FC<Props> = ({ boardId }) => {
  const { canEditBoard } = useUser();
  const [createColumnMutation] = useMutation(CREATE_COLUMN);

  const canCreateColumns = canEditBoard(boardId);

  const openModal = () =>
    modals.open({
      modalId,
      title: 'Создать колонку',
      children: <ColumnFormVisual state="create" submit={createColumn} />,
    });

  const createColumn = async (values: Omit<ColumnRenderFragment, 'id'>) => {
    await createColumnMutation({
      variables: {
        input: {
          boardId,
          ...values,
        },
      },
    });
    modals.close(modalId);
  };

  return canCreateColumns ? (
    <Button
      variant="light"
      color="dark-gray"
      h={50}
      fs="md"
      leftSection={<IconLibraryPlus size={14} />}
      onClick={openModal}
    >
      Добавить колонку
    </Button>
  ) : null;
};
