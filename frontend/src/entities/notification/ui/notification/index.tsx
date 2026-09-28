import { type FC, type PropsWithChildren } from 'react';
import { Stack, Group, Paper, Text, ActionIcon } from '@mantine/core';
import { IconEyeCheck } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { type NotificationRenderFragment } from '../../model';

import styles from './notification.module.css';

type Props = PropsWithChildren<{
  notification: NotificationRenderFragment;
  readNotification: (id: string) => void;
}>;

export const Notification: FC<Props> = (props) => (
  <Paper withBorder p="sm" radius="md" className={styles.root}>
    <Stack gap="sm">
      <Group h={24} justify="space-between">
        <Text size="xs" c="dimmed">
          {dayjs(props.notification.createdAt).format('DD MM YYYY в HH:mm')}
        </Text>

        {!props.notification.isRead && (
          <ActionIcon
            variant="outline"
            color="gray"
            size={24}
            className={styles.readIcon}
            onClick={() => props.readNotification(props.notification.id)}
          >
            <IconEyeCheck size={16} />
          </ActionIcon>
        )}
      </Group>

      {props.children}
    </Stack>
  </Paper>
);
