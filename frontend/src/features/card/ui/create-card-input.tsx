import { useState, type FC, type KeyboardEvent } from 'react';
import { Input } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useMutation } from '@apollo/client/react';

import { CREATE_CARD } from '@/entities/card';

interface Props {
  boardId: string;
  columnId: string;
}

export const CreateCardInput: FC<Props> = ({ boardId, columnId }) => {
  const [inProgress, setInProgress] = useState(false);
  const [createCardMutation] = useMutation(CREATE_CARD);

  const onKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      setInProgress(true);
      await createCardMutation({
        variables: {
          input: {
            boardId,
            columnId,
            name: target.value,
          },
        },
      });
      setInProgress(false);
      target.value = '';
    }
  };

  return (
    <Input
      variant="filled"
      loading={inProgress}
      leftSection={<IconPlus size={14} />}
      styles={{ input: { border: 0 } }}
      onKeyDown={onKeyDown}
    />
  );
};
