import { ApolloClient, InMemoryCache } from '@apollo/client';

import generated from 'generated/graphql';

import { links } from './links';
import { relayStyledPagination } from './relay-styled-pagination';

export const createApolloClient = () =>
  new ApolloClient({
    link: links,
    cache: new InMemoryCache({
      possibleTypes: generated.possibleTypes,
      typePolicies: {
        Query: {
          fields: {
            notifications: relayStyledPagination(),
          },
        },
        Board: {
          fields: {
            boardMembers: {
              merge: (_, incoming) => incoming,
            },
          },
        },
        Card: {
          fields: {
            tags: {
              merge: (_, incoming) => incoming,
            },
            assignees: {
              merge: (_, incoming) => incoming,
            },
            comments: relayStyledPagination(),
            history: relayStyledPagination(),
          },
        },
        Column: {
          fields: {
            cards: {
              merge: (_, incoming) => incoming,
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
