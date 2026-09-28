import { graphql } from 'generated/gql';

export const USER_SHORT = graphql(`
  fragment UserId on User {
    id
  }

  fragment UserShort on User {
    id
    firstName
    lastName
    email
  }
`);
