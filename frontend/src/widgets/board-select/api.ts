import { graphql } from 'generated/gql';

export const ALL_BOARDS = graphql(`
  query allBoards {
    boards {
      ...BoardRender
    }
  }
`);
