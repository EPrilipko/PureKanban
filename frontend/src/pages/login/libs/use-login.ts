import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { useForm, schemaResolver } from '@mantine/form';
import { z } from 'zod';

import { ROUTES } from '@/shared/model';
import { LOGIN, useSessionStore } from '@/entities/session';

type Status = { _type: 'in_progress' } | { _type: 'error'; error: string };

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useSessionStore();

  const [status, setStatus] = useState<Status | null>(null);
  const [loginMutation] = useMutation(LOGIN);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: schemaResolver(
      z.object({
        email: z.email(),
        password: z.string(),
      }),
    ),
  });

  const login = async (values: typeof form.values) => {
    setStatus({ _type: 'in_progress' });
    try {
      const loginResult = await loginMutation({
        variables: {
          input: { email: values.email, password: values.password, deviceId: crypto.randomUUID() },
        },
        context: { skipAuthInterceptor: true },
      });

      setAccessToken(loginResult.data?.login.accessToken);
      setStatus(null);
      navigate(ROUTES.ROOT_PATTERN);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';

      setStatus({ _type: 'error', error: errorMessage });
      throw error;
    }
  };

  return {
    form,
    status,
    login,
  };
};
