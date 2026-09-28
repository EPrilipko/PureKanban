import { type FC, type PropsWithChildren, useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client/react';
import { Loader, Center } from '@mantine/core';

import { REFRESH, useSessionStore } from '@/entities/session';

export const AuthInitializer: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setAccessToken } = useSessionStore();
  const [refreshMutation] = useMutation(REFRESH);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current === true) return;

    (async () => {
      if (!isAuthenticated) {
        try {
          const refreshResult = await refreshMutation({
            context: { skipAuthInterceptor: true },
          });

          setAccessToken(refreshResult.data?.refresh.accessToken);
        } finally {
          setIsAuthenticated(true);
        }
      }
    })();

    return () => {
      isInitialized.current = true;
    };
  }, []);

  return isAuthenticated ? (
    children
  ) : (
    <Center h="100vh">
      <Loader />
    </Center>
  );
};
