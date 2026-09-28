import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { wsUrl } from '@/shared/model/urls';

import { useSessionStore } from '@/entities/session';

export const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl,
    connectionParams: () => {
      const token = useSessionStore.getState().accessToken;

      return { authorization: token ? `Bearer ${token}` : '' };
    },
  }),
);
