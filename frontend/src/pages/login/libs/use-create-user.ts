import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { modals } from '@mantine/modals';
import { useForm, schemaResolver } from '@mantine/form';
import { z } from 'zod';

import { CREATE_USER } from '@/entities/session';

type CreateUserStatus = { _type: 'in_progress' } | { _type: 'error'; error: string };

export const useCreateUser = (closeForm: () => void) => {
  const [status, setStatus] = useState<CreateUserStatus | null>(null);
  const [createUserMutation] = useMutation(CREATE_USER);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },

    validate: schemaResolver(
      z.object({
        firstName: z
          .string()
          .min(2, { message: 'Имя должно содержать минимум 2 символа' })
          .transform((val) => val.trim()),
        lastName: z
          .string()
          .min(2, { message: 'Фамилия должна содержать минимум 2 символа' })
          .transform((val) => val.trim()),
        email: z.string().email({ message: 'Некорректный email' }),
        password: z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' }),
      }),
    ),
  });

  const createUser = async (values: typeof form.values) => {
    setStatus({ _type: 'in_progress' });
    try {
      await createUserMutation({
        variables: {
          input: values,
        },
        context: { skipAuthInterceptor: true },
      });

      modals.openConfirmModal({
        title: 'Пользователь создан',
        children: 'Вы будете перенаправлены на страницу логина',
        confirmProps: {
          children: 'OK',
        },
        closeButtonProps: {
          display: 'none',
        },
        cancelProps: {
          display: 'none',
        },
        onConfirm: closeForm,
        onCancel: closeForm,
        onClose: closeForm,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';

      setStatus({ _type: 'error', error: errorMessage });
      throw error;
    }
  };

  return {
    form,
    status,
    createUser,
  };
};
