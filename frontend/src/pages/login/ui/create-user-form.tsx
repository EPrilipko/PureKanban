import { type FC } from 'react';
import { Text, TextInput, PasswordInput, Button, Group } from '@mantine/core';

import { useCreateUser } from '../libs';

interface Props {
  closeForm: () => void;
}

export const CreateUserForm: FC<Props> = ({ closeForm }) => {
  const { form, status, createUser } = useCreateUser(closeForm);

  const inProgress = status?._type === 'in_progress';
  const error = status?._type === 'error' ? status.error : null;

  return (
    <form onSubmit={form.onSubmit(createUser)}>
      <Group grow mb="md">
        <TextInput
          required
          label="Имя"
          placeholder="Иван"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          required
          label="Фамилия"
          placeholder="Иванов"
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />
      </Group>

      <TextInput
        required
        label="Email"
        placeholder="your@email.com"
        mb="md"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <PasswordInput
        required
        label="Пароль"
        placeholder="Минимум 6 символов"
        mb="md"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      {error && (
        <Text c="red" ta="center" mt="md">
          {error}
        </Text>
      )}

      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={inProgress}>
          Создать
        </Button>
      </Group>
    </form>
  );
};
