import { Menu, Text, UnstyledButton, Box } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { UserAvatar } from '@/entities/user';

import { useUserMenu } from './libs';

export function UserMenu() {
  const { user, logout } = useUserMenu();

  if (!user) {
    return null;
  }

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <UnstyledButton>
          <UserAvatar user={user} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label fw="700">Current user</Menu.Label>
        <Box px="xs" py="xs">
          <Text size="sm" fw={500} c="dimmed">
            {user.firstName} {user.lastName}
          </Text>
        </Box>

        <Menu.Divider />

        <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
