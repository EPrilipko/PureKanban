import { useState } from 'react';
import { useSuspenseQuery, useMutation, useSubscription } from '@apollo/client/react';

import { ATTACH_TAG_TO_CARD } from '@/entities/card';
import { TAG_CREATED, TAG_UPDATED, TAG_DELETED } from '@/entities/tag';

import { GET_CARD_BY_ID } from '../api';

export const useCardModal = (boardId: string, cardId: string) => {
  const [attachCardToTagMutation] = useMutation(ATTACH_TAG_TO_CARD);

  const {
    data: { cardById: card },
  } = useSuspenseQuery(GET_CARD_BY_ID, {
    variables: { input: { boardId, cardId } },
  });

  const [tagsPopoverOpened, setTagsPopoverOpened] = useState(false);

  const toggleTag = async (tagId: string) => {
    const cardTags = card.tags.map((tag) => tag.id);

    await attachCardToTagMutation({
      variables: {
        input: {
          boardId,
          id: cardId,
          tagIds: cardTags.includes(tagId)
            ? cardTags.filter((tId) => tId !== tagId)
            : [...cardTags, tagId],
        },
      },
    });
  };

  useSubscription(TAG_CREATED, {
    variables: { input: { boardId } },
  });

  useSubscription(TAG_UPDATED, {
    variables: { input: { boardId } },
  });

  useSubscription(TAG_DELETED, { 
    variables: { input: { boardId }},
    onData: ({ client, data }) => {
      const deletedTag = data?.data?.tagDeleted;

      if (!deletedTag) {
        return;
      }

      client.cache.evict({
        id: client.cache.identify(deletedTag),
      });
      client.cache.gc();
    },
  });

  return {
    card,
    tagsPopoverOpened,
    setTagsPopoverOpened,
    toggleTag,
  };
};
