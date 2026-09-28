import { type FC, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/shared/model';

import { useSessionStore } from '@/entities/session';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { accessToken } = useSessionStore();

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN_PATTERN} />;
  }

  return children;
};
