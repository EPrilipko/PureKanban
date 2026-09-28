import { ApolloLink, Observable } from '@apollo/client';

import { useSessionStore } from '@/entities/session';

interface PendingRequest {
  resolve: (accessToken: string) => void;
  reject: (error: Error) => void;
}

let isRefreshing = false;
let pendingRequests: PendingRequest[] = [];

const refreshToken = async () => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation { refresh { accessToken } }`,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error('Refresh failed', result.errors);
  }
  return result.data.refresh.accessToken;
};

const { setAccessToken, clearAuth } = useSessionStore.getState();

export const handleAuthorizationError = (
  operation: ApolloLink.Operation,
  forward: ApolloLink.ForwardFunction,
) =>
  new Observable((observer) => {
    const requestPromise = new Promise<string>((resolve, reject) =>
      pendingRequests.push({ resolve, reject }),
    );

    requestPromise
      .then((accessToken) => {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            authorization: `Bearer ${accessToken}`,
          },
        }));

        forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch((error) => {
        observer.error(error);
      });

    if (!isRefreshing) {
      isRefreshing = true;

      refreshToken()
        .then((result) => {
          const accessToken = result.data?.refresh.accessToken;

          setAccessToken(accessToken);

          pendingRequests.forEach((request) => request.resolve(accessToken));

          isRefreshing = false;
          pendingRequests = [];
        })
        .catch((error) => {
          pendingRequests.forEach((request) => request.reject(error));
          clearAuth();

          isRefreshing = false;
          pendingRequests = [];
        });
    }
  });
