import { graphql } from 'generated/gql';

export const CREATE_COLUMN = graphql(`
  mutation createColumn($input: CreateColumnInput!) {
    createColumn(input: $input) {
      ...ColumnRender
      ...ColumnSort
      board {
        ...BoardId
        columns {
          ...ColumnId
        }
      }
    }
  }
`);

export const UPDATE_COLUMN = graphql(`
  mutation updateColumn($input: UpdateColumnInput!) {
    updateColumn(input: $input) {
      ...ColumnRender
    }
  }
`);

export const MOVE_COLUMN = graphql(`
  mutation moveColumn($input: MoveColumnInput!) {
    moveColumn(input: $input) {
      ...ColumnRender
      ...ColumnSort
    }
  }
`);

export const DELETE_COLUMN = graphql(`
  mutation deleteColumn($boardId: ID!, $id: ID!) {
    deleteColumn(boardId: $boardId, id: $id) {
      ...ColumnId
    }
  }
`);
