import type { GraphQLFormattedError } from 'graphql';
import { makeVar } from '@apollo/client';

import { GraphqlErrorCode } from 'generated/graphql';

export const boardMembershipErrorVar = makeVar<GraphqlErrorCode | null>(null);

export const handleBoardMembershipErrors = (errors: readonly GraphQLFormattedError[]) => {
  for (const error of errors) {
    boardMembershipErrorVar(error.extensions?.code as GraphqlErrorCode);
  }
};
