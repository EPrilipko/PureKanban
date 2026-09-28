import { graphql } from 'generated/gql';

graphql(`
  fragment ColumnId on Column {
    id
  }

  fragment ColumnSort on Column {
    id
    rank
  }

  fragment ColumnRender on Column {
    id
    name
    color
    maxCardsCount
  }
`);
