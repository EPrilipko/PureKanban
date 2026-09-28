import { graphql } from 'generated/gql';

export const WHO_AM_I = graphql(`
  query whoAmI {
    whoAmI {
      id
      firstName
      lastName
      email
      boardMemberships {
        id
        role
        board {
          ...BoardId
        }
      }
    }
  }
`);
