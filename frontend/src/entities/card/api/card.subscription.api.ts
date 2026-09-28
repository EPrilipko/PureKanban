import { graphql } from 'generated/gql';

export const CARD_CREATED = graphql(`
  subscription cardCreated($input: CardSubscriptionInput!) {
    cardCreated(input: $input) {
      ...CardRender
      ...CardSort
      column {
        ...ColumnId
      }
    }
  }
`);

export const CARD_UPDATED = graphql(`
  subscription cardUpdated($input: CardSubscriptionInput!) {
    cardUpdated(input: $input) {
      ...CardRender
      ...CardSort
      column {
        ...ColumnId
      }
      owner {
        ...UserShort
      }
      assignees {
        ...UserShort
      }
      tags {
        ...TagId
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

export const CARD_MOVED = graphql(`
  subscription cardMoved($input: CardSubscriptionInput!) {
    cardMoved(input: $input) {
      card {
        ...CardRender
        ...CardSort
        column {
          ...ColumnId
        }
      }
      sourceColumn {
        ...ColumnId
      }
      targetColumn {
        ...ColumnId
      }
    }
  }
`);
