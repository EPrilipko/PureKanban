import type { ChangeEvent, FC } from 'react';
import { TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { useMutation } from '@apollo/client/react';

import { useUser } from '@/entities/session';
import { UPDATE_CARD, type CardRenderFragment } from '@/entities/card';

interface Props {
  boardId: string;
  card: CardRenderFragment;
}

export const CardNameInput: FC<Props> = ({ boardId, card }) => {
  const { canEditBoard } = useUser();
  const canEditCard = canEditBoard(boardId);

  const [updateCardMutation] = useMutation(UPDATE_CARD);
  const updateCardDebounced = useDebouncedCallback(
    (name: string) =>
      updateCardMutation({
        variables: {
          input: {
            boardId,
            id: card.id,
            name,
          },
        },
      }),
    300,
  );

  const onChange = async (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    await updateCardDebounced(target.value);
  };

  return (
    <TextInput
      readOnly={!canEditCard}
      defaultValue={card.name}
      variant="unstyled"
      placeholder="Название карточки"
      styles={{
        input: {
          fontWeight: 700,
          fontSize: 'var(--mantine-font-size-xl)',
        },
      }}
      onChange={onChange}
    />
  );
};
