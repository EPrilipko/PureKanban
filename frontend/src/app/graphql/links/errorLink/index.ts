import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';

import { handleAuthorizationError } from './handleAuthorizationError';
import { handleBoardMembershipErrors } from './handleBoardMembershipErrors';


interface GraphQLErrorExtension {
  originalError?: {
    statusCode?: number;
    message?: string;
    error?: string;
  };
}
export const errorLink = new ErrorLink(({ operation, error, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    if (!error.errors.length) return;

    const { skipAuthInterceptor } = operation.getContext();
    if (skipAuthInterceptor) return;

    const authError = error.errors.some(
      (error) => (error.extensions as GraphQLErrorExtension)?.originalError?.statusCode === 401,
    );

    if (authError) {
      handleAuthorizationError(operation, forward);
      return;
    }

    handleBoardMembershipErrors(error.errors);

    error.errors.forEach((error) => {
      console.error(`[GraphQL Error]: ${error.message} (path: ${error.path})`);
    });
  } else {
    console.error(`[Network Error]: ${error.message}`);
  }

  return forward(operation);
});
