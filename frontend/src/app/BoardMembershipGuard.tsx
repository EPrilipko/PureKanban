import { useEffect, type FC, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client/react';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { Text, Button, Stack } from '@mantine/core';

import { GraphqlErrorCode } from 'generated/graphql';

import { ROUTES } from '@/shared/model/routes';

import { boardMembershipErrorVar } from './graphql/links/errorLink/handleBoardMembershipErrors';

export const BoardMembershipGuard: FC<PropsWithChildren> = ({ children }) => {
  const boardMembershipError = useReactiveVar(boardMembershipErrorVar);
  const navigate = useNavigate();

  useEffect(() => {
    switch (boardMembershipError) {
      case GraphqlErrorCode.BadRequest:
        notifications.show({
          color: 'red',
          title: 'Ошибка при выполнении запроса',
          message: 'Что-то пошло не так',
        });
        return;

      case GraphqlErrorCode.BoardReadDenied:
        modals.open({
          withOverlay: true,
          modalId: GraphqlErrorCode.BoardReadDenied,
          title: <Text fw="700">Доступ ограничен</Text>,
          children: (
            <Stack gap="md">
              <Text>У вас нет доступа к данной доске. Вы будете перенаправлены к списку досок</Text>

              <Button
                onClick={() => {
                  modals.close(GraphqlErrorCode.BoardReadDenied);
                  navigate(ROUTES.BOARDS_PATTERN);
                }}
              >
                OK
              </Button>
            </Stack>
          ),
        });
        return;

      case GraphqlErrorCode.BoardWriteDenied:
        notifications.show({
          color: 'red',
          title: 'Доступ ограничен',
          message: 'У вас нет прав на редактивароние доски',
        });
        return;
    }
  }, [boardMembershipError, navigate]);

  if (boardMembershipError === GraphqlErrorCode.BoardReadDenied) {
    return null;
  }

  return children;
};
