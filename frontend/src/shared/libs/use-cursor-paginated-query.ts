import { useTransition } from 'react';
import { useSuspenseQuery } from '@apollo/client/react';

import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

export const useCursorPaginatedQuery = <R, Q, V>(
  query: TypedDocumentNode<Q, V>,
  variables: Partial<V>,
  batchSize: number,
  dataSelector: (data: Q) => { edges: R[]; endCursor?: string | null; hasNextPage: boolean },
) => {
  const [isFetching, startFetchTransition] = useTransition();

  const queryRes = useSuspenseQuery(query, {
    variables: {
      ...variables,

      pagination: { first: batchSize, after: null },
    },
  });

  const data = dataSelector(queryRes.data);

  const fetchMore = () => {
    if (!isFetching && data.hasNextPage) {
      startFetchTransition(() => {
        queryRes.fetchMore({
          variables: {
            ...variables,
            pagination: { first: batchSize, after: data.endCursor },
          },
        });
      });
    }
  };

  return {
    edges: data.edges,
    isFetching,
    fetchMore,
    subscribeToMore: queryRes.subscribeToMore,
  };
};
