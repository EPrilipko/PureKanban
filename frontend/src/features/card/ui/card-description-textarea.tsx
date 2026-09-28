import type { ChangeEvent, FC } from 'react';
import { Textarea } from '@mantine/core';
import { useMutation } from '@apollo/client/react';
import { useDebouncedCallback } from '@mantine/hooks';

import { useUser } from '@/entities/session';
import { UPDATE_CARD, type CardRenderFragment } from '@/entities/card';

interface Props {
  boardId: string;
  card: CardRenderFragment;
}

export const CardDescriptionTextarea: FC<Props> = ({ boardId, card }) => {
  const { canEditBoard } = useUser();
  const canEditCard = canEditBoard(boardId);

  const [updateCardMutation] = useMutation(UPDATE_CARD);
  const updateCardDebounced = useDebouncedCallback(
    (description: string) =>
      updateCardMutation({
        variables: {
          input: {
            boardId,
            id: card.id,
            description,
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
    <Textarea
      readOnly={!canEditCard}
      autosize
      defaultValue={card.description}
      minRows={2}
      maxRows={6}
      label="Описание"
      placeholder="Подробнее о задаче..."
      onChange={onChange}
    />
  );
};
