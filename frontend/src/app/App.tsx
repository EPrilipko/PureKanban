import { useMemo } from 'react';
import { MantineProvider, Loader } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { ApolloProvider } from '@apollo/client/react';
import { RouterProvider } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';

import { createApolloClient } from './graphql';
import { createRouter } from './router';
import { theme } from './mantine';
import { AuthInitializer } from './AuthInitializer';

export const App = () => {
  const apolloClient = useMemo(() => createApolloClient(), []);
  const router = useMemo(() => createRouter(), []);

  const shouldRenderApp = apolloClient && router;

  if (!shouldRenderApp) {
    return <Loader />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Notifications />

          <AuthInitializer>
            <RouterProvider router={router} />
          </AuthInitializer>
        </ModalsProvider>
      </MantineProvider>
    </ApolloProvider>
  );
};
