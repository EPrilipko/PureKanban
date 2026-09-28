import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { modals } from '@mantine/modals';

import { ROUTES } from '@/shared/model';
import { useUser, LOGOUT } from '@/entities/session';

const LOGOUT_ERROR_MODAL_ID = 'logout_error_modal';

export function useUserMenu() {
  const navigate = useNavigate();

  const { user } = useUser();

  const [logoutMutation] = useMutation(LOGOUT);

  const logout = async () => {
    try {
      await logoutMutation();
      navigate(ROUTES.LOGIN_PATTERN);
    } catch (error) {
      const closeLogoutErrorModal = () => modals.close(LOGOUT_ERROR_MODAL_ID);
      modals.openConfirmModal({
        modalId: LOGOUT_ERROR_MODAL_ID,
        title: 'Ошибка логаута',
        children: 'Во время логаута произошла ошибка ' + error,
        confirmProps: {
          children: 'OK',
        },
        closeButtonProps: {
          display: 'none',
        },
        cancelProps: {
          display: 'none',
        },
        onConfirm: closeLogoutErrorModal,
        onCancel: closeLogoutErrorModal,
        onClose: closeLogoutErrorModal,
      });
    }
  };

  return {
    user,
    logout,
  };
}
