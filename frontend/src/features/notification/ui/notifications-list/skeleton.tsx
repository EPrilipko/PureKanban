import { Paper, Skeleton, Stack } from '@mantine/core';

export const NotificationsListSkeleton = () => (
  <Stack gap="xs" pr="md">
    <NotificationSkeleton />
    <NotificationSkeleton />
  </Stack>
);

export const NotificationSkeleton = () => (
  <Paper withBorder p="sm" radius="md">
    <Stack gap="sm">
      <Skeleton height={16} width={110} radius="sm" />

      <Stack gap={6}>
        <Skeleton height={20} radius="sm" />
        <Skeleton height={20} width="60%" radius="sm" />
      </Stack>
    </Stack>
  </Paper>
);
