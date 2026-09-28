import { useSubscription } from '@apollo/client/react';

import { useCursorPaginatedQuery } from '@/shared/libs';

import { CARD_HISTORY_CREATED, type CardHistoryEdge } from '@/entities/card-history';

import { CARD_HISTORY } from '../api';

const BATCH_SIZE = 5;

export const useCardHistoryList = (boardId: string, cardId: string) => {
  const {
    edges: historyItems,
    isFetching,
    fetchMore,
  } = useCursorPaginatedQuery(
    CARD_HISTORY,
    { input: { boardId, cardId } },
    BATCH_SIZE,
    ({
      cardById: {
        history: { edges, pageInfo },
      },
    }) => ({
      edges,
      endCursor: pageInfo.endCursor,
      hasNextPage: pageInfo.hasNextPage,
    }),
  );

  useSubscription(CARD_HISTORY_CREATED, {
    variables: { input: { boardId, cardId } },
    onData: ({ client, data }) => {
      const historyItemCreated = data.data?.historyCreated;

      if (!historyItemCreated) return;

      client.cache.modify({
        id: client.cache.identify(historyItemCreated.card),
        fields: {
          history: (existingData, { toReference, readField }) => {
            if (!existingData) return existingData;

            const isAlreadyExists = existingData.edges.some(
              (edge: CardHistoryEdge) => readField('id', edge.node) === historyItemCreated.id,
            );
            if (isAlreadyExists) return existingData;

            const newEdge = {
              __typename: 'CardCommentEdge',
              cursor: null, // new edge is appended at the start of list, so its cursor can ba arbitrary
              node: toReference(historyItemCreated),
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

  return { historyItems, isFetching, fetchMore };
};
