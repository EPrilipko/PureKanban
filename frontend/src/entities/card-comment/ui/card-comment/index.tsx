import { type FC, type ReactNode } from 'react';
import { Group, Text } from '@mantine/core';
import dayjs from 'dayjs';

import { UserAvatar } from '@/entities/user';

import type { CardCommentRenderFragment } from '../../model';

import styles from './card-comment.module.css';

interface Slots {
  content?: ReactNode;
  actions?: ReactNode;
}

interface Props {
  comment: CardCommentRenderFragment;
  slots?: Slots;
}

export const CardComment: FC<Props> = ({ comment, slots }) => {
  return (
    <>
      <Group gap="2xs">
        <UserAvatar user={comment.user} />

        <Text fw="bold" size="sm" lh="sm">
          {comment.user.firstName} {comment.user.lastName}
        </Text>

        <Text size="xs" lh="xs" c="dimmed">
          {dayjs(comment.createdAt).format('DD MM YYYY в HH:mm')}
        </Text>

        {slots?.actions && <div className={styles.actions}>{slots.actions}</div>}
      </Group>

      {slots?.content ? (
        <div className={styles.content}>{slots.content}</div>
      ) : (
        <Text size="sm" lh="sm" ml={40}>
          {comment.text}
        </Text>
      )}
    </>
  );
};
