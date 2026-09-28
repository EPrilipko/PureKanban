import { SetContextLink } from '@apollo/client/link/context';

import { useSessionStore } from '@/entities/session';

export const authLink = new SetContextLink(({ headers = {} }) => {
  const { accessToken } = useSessionStore.getState();

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
  };
});
