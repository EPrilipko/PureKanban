import { graphql } from 'generated/gql';

graphql(`
  fragment CardId on Card {
    id
  }

  fragment CardSort on Card {
    id
    rank
  }

  fragment CardName on Card {
    id
    name
  }

  fragment CardRender on Card {
    id
    name
    description
  }
`);
