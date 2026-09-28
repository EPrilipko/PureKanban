import { type FC, useState } from 'react';
import { Group, Textarea, ActionIcon } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { useMutation } from '@apollo/client/react';

import { useUser } from '@/entities/session';
import { UserAvatar } from '@/entities/user';
import { CREATE_CARD_COMMENT } from '@/entities/card-comment';

interface Props {
  boardId: string;
  cardId: string;
}

export const CreateCardCommentInput: FC<Props> = ({ boardId, cardId }) => {
  const { user, canEditBoard } = useUser();

  const canEditCard = canEditBoard(boardId);

  const [isFocused, setIsFocused] = useState(false);
  const [newComment, setNewComment] = useState('');
  const nonEmptyNewComment = !!newComment;

  const [createCardCommentMutation] = useMutation(CREATE_CARD_COMMENT);

  const sendComment = async () => {
    if (newComment) {
      await createCardCommentMutation({
        variables: { input: { boardId, cardId, text: newComment } },
      });

      setNewComment('');
    }
  };

  return (
    canEditCard && (
      <Group gap="2xs" align="start">
        <UserAvatar user={user} />

        <Textarea
          autosize
          minRows={1}
          maxRows={5}
          placeholder="Введите комментарий..."
          style={{ flex: 1 }}
          rightSection={
            (isFocused || nonEmptyNewComment) && (
              <ActionIcon bdrs="50%" onClick={sendComment} disabled={!nonEmptyNewComment}>
                <IconSend size={14} />
              </ActionIcon>
            )
          }
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </Group>
    )
  );
};
