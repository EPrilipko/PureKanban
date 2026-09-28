import { graphql } from 'generated/gql';

export const USERS_LIST = graphql(`
  query usersList {
    users {
      ...UserShort
    }
  }
`);
