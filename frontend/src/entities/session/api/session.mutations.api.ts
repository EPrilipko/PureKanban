import { graphql } from 'generated/gql';

export const LOGIN = graphql(`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      accessToken
    }
  }
`);

export const LOGOUT = graphql(`
  mutation logout {
    logout
  }
`);

export const REFRESH = graphql(`
  mutation refresh {
    refresh {
      accessToken
    }
  }
`);

export const CREATE_USER = graphql(`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserShort
    }
  }
`);
