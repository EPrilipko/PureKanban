import { graphql } from 'generated/gql';

export const CREATE_BOARD = graphql(`
  mutation createBoard($input: CreateBoardInput!) {
    createBoard(input: $input) {
      ...BoardRender
    }
  }
`);

export const UPDATE_BOARD = graphql(`
  mutation updateBoard($input: UpdateBoardInput!) {
    updateBoard(input: $input) {
      ...BoardRender
    }
  }
`);

export const DELETE_BOARD = graphql(`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId) {
      ...BoardId
    }
  }
`);
