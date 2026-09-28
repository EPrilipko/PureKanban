import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useLazyQuery } from '@apollo/client/react';

import { SEARCH_CARDS } from './api';

export const useBoardSpotlight = (boardId: string) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 300);
  const [searchCards, { loading, data: searchCardsData }] = useLazyQuery(SEARCH_CARDS);

  useEffect(() => {
    searchCards({
      variables: {
        input: { boardId, query: debouncedQuery },
      },
    });
  }, [boardId, debouncedQuery, searchCards]);

  return {
    query,
    setQuery,
    loading,
    searchCardsData,
  };
};
