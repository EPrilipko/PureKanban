import { TextInput, PasswordInput, Text, Button } from '@mantine/core';

import { useLogin } from '../libs';

export const LoginForm = () => {
  const { form, status, login } = useLogin();

  const inProgress = status?._type === 'in_progress';
  const error = status?._type === 'error' ? status.error : null;

  return (
    <form onSubmit={form.onSubmit(login)}>
      <TextInput
        label="Email"
        placeholder="your@email.com"
        required
        {...form.getInputProps('email')}
      />

      <PasswordInput
        label="Пароль"
        placeholder="Ваш пароль"
        mt="md"
        required
        {...form.getInputProps('password')}
      />

      {error && (
        <Text c="red" ta="center" mt="md">
          {error}
        </Text>
      )}

      <Button fullWidth mt="xl" type="submit" loading={inProgress}>
        Войти
      </Button>
    </form>
  );
};
