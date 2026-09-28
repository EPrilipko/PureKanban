import { graphql } from 'generated/gql';

export const TAG_CREATED = graphql(`
  subscription tagCreated($input: TagSubscriptionInput!) {
    tagCreated(input: $input) {
      ...TagRender
      cards {
        ...CardId
      }
      board {
        ...BoardId
        tags {
          ...TagRender
        }
      }
    }
  }
`);

export const TAG_UPDATED = graphql(`
  subscription tagUpdated($input: TagSubscriptionInput!) {
    tagUpdated(input: $input) {
      ...TagRender
    }
  }
`);

export const TAG_DELETED = graphql(`
  subscription tagDeleted($input: TagSubscriptionInput!) {
    tagDeleted(input: $input) {
      ...TagId
    }
  }
`);
