import { ApolloLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import { authLink } from './authLink';
import { errorLink } from './errorLink';
import { httpLink } from './httpLink';
import { wsLink } from './wsLink';

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const links = ApolloLink.from([authLink, errorLink, splitLink]);
