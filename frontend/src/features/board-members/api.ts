import { graphql } from 'generated/gql';

export const BOARD_MEMBERS_SELECT_DATA = graphql(`
  query boardMembersSelectData($boardId: ID!) {
    board(boardId: $boardId) {
      ...BoardRender
      ...BoardMembers
    }
  }
`);
