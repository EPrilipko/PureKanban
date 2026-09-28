import { graphql } from 'generated/gql';

export const BOARD_MEMBER_CREATED = graphql(`
  subscription boardMemberCreated {
    boardMemberCreated {
      ...BoardMemberFull
    }
  }
`);

export const BOARD_MEMBER_UPDATED = graphql(`
  subscription boardMemberUpdated {
    boardMemberUpdated {
      ...BoardMemberFull
    }
  }
`);

export const BOARD_MEMBER_DELETED = graphql(`
  subscription boardMemberDeleted {
    boardMemberDeleted {
      ...BoardMemberFull
    }
  }
`);
