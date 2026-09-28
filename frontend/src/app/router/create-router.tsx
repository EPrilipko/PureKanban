import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@/shared/model';
import { BoardPage } from '@/pages/board';
import { BoardsPage } from '@/pages/boards';
import { LoginPage } from '@/pages/login';

import { Error404 } from './Error404';
import { BaseLayout } from '../BaseLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { BoardMembershipGuard } from '../BoardMembershipGuard';

export const createRouter = () => {
  return createBrowserRouter([
    {
      element: <BaseLayout />,
      children: [
        {
          path: ROUTES.BOARD_PATTERN,
          element: (
            <ProtectedRoute>
              <BoardMembershipGuard>
                <BoardPage />
              </BoardMembershipGuard>
            </ProtectedRoute>
          ),
          children: [
            {
              path: ROUTES.BOARD_CARD_PATTERN,
              element: null,
            },
          ],
        },
        {
          path: ROUTES.BOARDS_PATTERN,
          element: (
            <ProtectedRoute>
              <BoardsPage />
            </ProtectedRoute>
          ),
        },
        {
          // no dedicated root page => redirect user to boards page
          path: ROUTES.ROOT_PATTERN,
          element: <Navigate to={ROUTES.BOARDS_PATTERN} replace />,
        },
      ],
    },
    { path: ROUTES.LOGIN_PATTERN, element: <LoginPage /> },
    {
      path: '*',
      element: <Error404 />,
    },
  ]);
};
