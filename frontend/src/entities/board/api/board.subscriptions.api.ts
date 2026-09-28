import { graphql } from 'generated/gql';

export const BOARD_CREATED = graphql(`
  subscription boardCreated {
    boardCreated {
      ...BoardRender
      ...BoardMembers
    }
  }
`);

export const BOARD_UPDATED = graphql(`
  subscription boardUpdated {
    boardUpdated {
      ...BoardRender
      ...BoardMembers
    }
  }
`);

export const BOARD_DELETED = graphql(`
  subscription boardDeleted {
    boardDeleted {
      ...BoardRender
      ...BoardMembers
    }
  }
`);
