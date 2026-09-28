import { HttpLink } from '@apollo/client';

import { graphqlUrl } from '@/shared/model/urls';

export const httpLink = new HttpLink({
  uri: graphqlUrl,
  credentials: 'include',
});
