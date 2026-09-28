import { graphql } from 'generated/gql';

graphql(`
  fragment BoardMemberId on BoardMember {
    id
  }

  fragment BoardMemberShort on BoardMember {
    id
    user {
      ...UserShort
    }
    role
  }

  fragment BoardMemberFull on BoardMember {
    id
    board {
      ...BoardRender
      ...BoardMembers
    }
    user {
      ...UserShort
    }
    role
  }
`);
