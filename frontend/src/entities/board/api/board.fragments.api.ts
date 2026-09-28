import { graphql } from 'generated/gql';

graphql(`
  fragment BoardId on Board {
    id
  }

  fragment BoardRender on Board {
    id
    name
    color
  }

  fragment BoardMembers on Board {
    id
    boardMembers {
      ...BoardMemberShort
    }
  }
`);
