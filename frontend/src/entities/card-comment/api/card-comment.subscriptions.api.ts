import { graphql } from 'generated/gql';

export const CARD_COMMENT_CREATED = graphql(`
  subscription cardCommentCreated($input: CardCommentSubscriptionInput!) {
    commentCreated(input: $input) {
      ...CardCommentRender
      card {
        ...CardId
      }
    }
  }
`);

export const CARD_COMMENT_UPDATED = graphql(`
  subscription cardCommentUpdated($input: CardCommentSubscriptionInput!) {
    commentUpdated(input: $input) {
      ...CardCommentRender
    }
  }
`);

export const CARD_COMMENT_DELETED = graphql(`
  subscription cardCommentDeleted($input: CardCommentSubscriptionInput!) {
    commentDeleted(input: $input) {
      ...CardCommentId
    }
  }
`);
