import type { FC } from 'react';
import { Indicator, type IndicatorProps } from '@mantine/core';

import { useUnreadNotificationsIndicator } from '../../libs';

export interface Props extends Omit<IndicatorProps, 'label'> {
  boardId: string;
}

export const UnreadNotificationsIndicatorVisual: FC<Props> = ({ boardId, ...props }) => {
  const { unreadNotifications } = useUnreadNotificationsIndicator(boardId);

  return (
    <Indicator
      disabled={!unreadNotifications}
      label={unreadNotifications}
      size={12}
      offset={4}
      color="red"
      {...props}
    >
      {props.children}
    </Indicator>
  );
};
