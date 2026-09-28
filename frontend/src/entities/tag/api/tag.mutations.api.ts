import { graphql } from 'generated/gql';

export const CREATE_TAG = graphql(`
  mutation createTag($input: CreateTagInput!) {
    createTag(input: $input) {
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

export const UPDATE_TAG = graphql(`
  mutation updateTag($input: UpdateTagInput!) {
    updateTag(input: $input) {
      ...TagRender
    }
  }
`);

export const DELETE_TAG = graphql(`
  mutation deleteTag($boardId: ID!, $id: ID!) {
    deleteTag(boardId: $boardId, id: $id) {
      ...TagId
    }
  }
`);
