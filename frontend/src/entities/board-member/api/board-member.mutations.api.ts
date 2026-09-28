import { graphql } from 'generated/gql';

export const CREATE_BOARD_MEMBER = graphql(`
  mutation createBoardMember($input: CreateBoardMemberInput!) {
    createBoardMember(input: $input) {
      board {
        ...BoardId
        boardMembers {
          user {
            ...UserId
          }
          role
        }
      }
    }
  }
`);

export const UPDATE_BOARD_MEMBER = graphql(`
  mutation updateBoardMember($input: UpdateBoardMemberInput!) {
    updateBoardMember(input: $input) {
      board {
        ...BoardId
        boardMembers {
          user {
            ...UserId
          }
          role
        }
      }
    }
  }
`);

export const DELETE_BOARD_MEMBER = graphql(`
  mutation deleteBoardMember($input: DeleteBoardMemberInput!) {
    deleteBoardMember(input: $input) {
      ...BoardMemberId
    }
  }
`);
