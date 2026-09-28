import type { FC } from 'react';
import { Stack, ScrollArea } from '@mantine/core';

import { useCardCommentsList } from '../../libs';

import { EditableCardComment } from '@/features/card-comment';

import { CardCommentsListSkeleton } from './skeleton';

export interface Props {
  boardId: string;
  cardId: string;
}

export const CardCommentsListVisual: FC<Props> = ({ boardId, cardId }) => {
  const { comments, isFetching, fetchMore } = useCardCommentsList(boardId, cardId);

  return (
    <>
      <ScrollArea.Autosize mah={400} onBottomReached={fetchMore} pr="md">
        <Stack gap="2xs">
          {comments.map((comment) => (
            <EditableCardComment boardId={boardId} key={comment.node.id} comment={comment.node} />
          ))}
        </Stack>

        {isFetching && <CardCommentsListSkeleton />}
      </ScrollArea.Autosize>
    </>
  );
};
