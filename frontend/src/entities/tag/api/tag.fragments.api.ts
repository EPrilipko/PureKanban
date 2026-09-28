import { graphql } from 'generated/gql';

graphql(`
  fragment TagId on Tag {
    id
  }

  fragment TagRender on Tag {
    id
    name
    color
  }
`);
