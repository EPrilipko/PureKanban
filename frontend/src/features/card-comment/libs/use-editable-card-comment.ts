import { useState } from 'react';
import { useMutation } from '@apollo/client/react';

import {
  type CardCommentRenderFragment,
  UPDATE_CARD_COMMENT,
  DELETE_CARD_COMMENT,
} from '@/entities/card-comment';

type State = { type: 'default' } | { type: 'update'; text: string };

export const useEditableCardComment = (boardId: string, comment: CardCommentRenderFragment) => {
  const [state, setState] = useState<State>({ type: 'default' });

  const [updateCardCommentMutation] = useMutation(UPDATE_CARD_COMMENT);
  const [deleteCardCommentMutation] = useMutation(DELETE_CARD_COMMENT);

  const deleteComment = async () => {
    await deleteCardCommentMutation({
      variables: { boardId, commentId: comment.id },
      update: (cache, result) => {
        const deletedComment = result.data?.deleteCardComment;

        if (deletedComment) {
          cache.evict({ id: cache.identify(deletedComment) });
          cache.gc();
        }
      },
    });
  };

  const updateComment = async () => {
    if (state.type === 'update') {
      if (state.text !== comment.text) {
        await updateCardCommentMutation({
          variables: { input: { boardId, id: comment.id, text: state.text } },
        });
      }

      setState({ type: 'default' });
    }
  };

  return {
    state,
    setState,
    deleteComment,
    updateComment,
  };
};
