import { graphql } from 'generated/gql';

export const GET_BOARD_DATA = graphql(`
  query getBoardData($boardId: ID!) {
    board(boardId: $boardId) {
      ...BoardRender
      columns {
        ...ColumnRender
        ...ColumnSort
        cards {
          ...CardRender
          ...CardSort
          column {
            ...ColumnId
          }
        }
      }
    }
  }
`);

export type { GetBoardDataQuery } from 'generated/graphql';
