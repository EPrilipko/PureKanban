import { graphql } from 'generated/gql';

export const COLUMN_CREATED = graphql(`
  subscription columnCreated($input: ColumnSubscriptionInput!) {
    columnCreated(input: $input) {
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
`);

export const COLUMN_UPDATED = graphql(`
  subscription columnUpdated($input: ColumnSubscriptionInput!) {
    columnUpdated(input: $input) {
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
`);

export const COLUMN_DELETED = graphql(`
  subscription columnDeleted($input: ColumnSubscriptionInput!) {
    columnDeleted(input: $input) {
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
`);
