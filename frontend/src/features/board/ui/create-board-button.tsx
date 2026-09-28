import { useMutation } from '@apollo/client/react';
import { Text, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus, IconBriefcase } from '@tabler/icons-react';

import { CREATE_BOARD, type BoardRenderFragment, BoardForm } from '@/entities/board';

const MODAL_ID = 'CREATE_BOARD_MODAL';

export const CreateBoardButton = () => {
  const [createBoardMutation] = useMutation(CREATE_BOARD);

  const createBoard = async (input: Omit<BoardRenderFragment, 'id'>) => {
    await createBoardMutation({ variables: { input } });
    modals.close(MODAL_ID);
  };

  const openModal = () =>
    modals.open({
      modalId: MODAL_ID,
      title: 'Создать доску',
      children: <BoardForm state="create" submit={createBoard} />,
    });

  return (
    <Button
      size="sm"
      variant="outline"
      radius="sm"
      color="lightgray"
      p="xs"
      leftSection={<IconBriefcase color="#497bc8" size={16} />}
      rightSection={<IconPlus size={14} />}
      onClick={openModal}
    >
      <Text size="xs" c="black" fw="600">
        Создать доску
      </Text>
    </Button>
  );
};
