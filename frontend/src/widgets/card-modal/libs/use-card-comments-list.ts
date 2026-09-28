import { useSubscription } from '@apollo/client/react';

import { useCursorPaginatedQuery } from '@/shared/libs';

import {
  CARD_COMMENT_CREATED,
  CARD_COMMENT_UPDATED,
  CARD_COMMENT_DELETED,
  type CardCommentEdge,
} from '@/entities/card-comment';

import { CARD_COMMENTS } from '../api';

const BATCH_SIZE = 10;

export const useCardCommentsList = (boardId: string, cardId: string) => {
  const {
    edges: comments,
    isFetching,
    fetchMore,
  } = useCursorPaginatedQuery(
    CARD_COMMENTS,
    { input: { cardId, boardId } },
    BATCH_SIZE,
    ({
      cardById: {
        comments: { edges, pageInfo },
      },
    }) => ({
      edges,
      hasNextPage: pageInfo.hasNextPage,
      endCursor: pageInfo.endCursor,
    }),
  );

  useSubscription(CARD_COMMENT_CREATED, {
    variables: { input: { boardId, cardId } },
    onData: ({ client, data }) => {
      const newComment = data.data?.commentCreated;

      if (!newComment) {
        return;
      }

      client.cache.modify({
        id: client.cache.identify(newComment.card),
        fields: {
          comments(existingData, { toReference, readField }) {
            if (!existingData) return existingData;

            const isAlreadyExists = existingData.edges.some(
              (edge: CardCommentEdge) => readField('id', edge.node) === newComment.id,
            );
            if (isAlreadyExists) return existingData;

            const newEdge = {
              __typename: 'CardCommentEdge',
              cursor: null, // new edge is appended at the start of list, so its cursor can ba arbitrary
              node: toReference(newComment),
            };

            return {
              ...existingData,
              edges: [newEdge, ...existingData.edges],
            };
          },
        },
      });
    },
  });

  useSubscription(CARD_COMMENT_UPDATED, {
    variables: { input: { boardId, cardId } },
  });

  useSubscription(CARD_COMMENT_DELETED, {
    variables: { input: { boardId, cardId } },
    onData: ({ client, data }) => {
      const deletedComment = data?.data?.commentDeleted;

      if (!deletedComment) {
        return;
      }

      client.cache.evict({
        id: client.cache.identify(deletedComment),
      });
      client.cache.gc();
    },
  });

  return { comments, isFetching, fetchMore };
};
