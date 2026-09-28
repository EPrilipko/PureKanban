import { useState } from 'react';
import { Title, Container, Text, Anchor, Paper } from '@mantine/core';

import { LoginForm } from './login-form';
import { CreateUserForm } from './create-user-form';

export function LoginPage() {
  const [state, setState] = useState<'login' | 'createUser'>('login');

  const openLoginForm = () => setState('login');

  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2} fw={900}>
        Добро пожаловать!
      </Title>

      {state === 'createUser' ? (
        <Text c="dimmed" size="sm" ta="center" mt="sm">
          Создание пользователя&nbsp;
          <Anchor size="sm" component="button" type="button" onClick={openLoginForm}>
            Войти
          </Anchor>
        </Text>
      ) : (
        <Text c="dimmed" size="sm" ta="center" mt="sm">
          Ещё нет аккаунта?&nbsp;
          <Anchor size="sm" component="button" type="button" onClick={() => setState('createUser')}>
            Создать аккаунт
          </Anchor>
        </Text>
      )}

      <Paper withBorder shadow="md" p="md" mt="md" radius="md">
        {state === 'createUser' ? (
          <CreateUserForm closeForm={openLoginForm} />
        ) : (
          <>
            <LoginForm />
          </>
        )}
      </Paper>
    </Container>
  );
}
