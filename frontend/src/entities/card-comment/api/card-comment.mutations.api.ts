import { graphql } from 'generated/gql';

export const CREATE_CARD_COMMENT = graphql(`
  mutation createCardComment($input: CreateCardCommentInput!) {
    createCardComment(input: $input) {
      ...CardCommentRender
    }
  }
`);

export const UPDATE_CARD_COMMENT = graphql(`
  mutation updateCardComment($input: UpdateCardCommentInput!) {
    updateCardComment(input: $input) {
      ...CardCommentRender
    }
  }
`);

export const DELETE_CARD_COMMENT = graphql(`
  mutation deleteCardComment($boardId: ID!, $commentId: ID!) {
    deleteCardComment(boardId: $boardId, commentId: $commentId) {
      ...CardCommentId
    }
  }
`);
