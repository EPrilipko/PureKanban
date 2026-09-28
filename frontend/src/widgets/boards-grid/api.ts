import { graphql } from 'generated/gql';

export const BOARDS_GRID_DATA = graphql(`
  query boardsGridData {
    boards {
      ...BoardRender
      ...BoardMembers
    }
  }
`);

export type { BoardsGridDataQuery } from 'generated/graphql';
