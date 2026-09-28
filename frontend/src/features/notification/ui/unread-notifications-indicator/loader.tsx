import type { FC, PropsWithChildren } from 'react';
import { Indicator } from '@mantine/core';

export const UnreadNotificationsIndicatorLoader: FC<PropsWithChildren> = ({ children }) => {
  return <Indicator disabled>{children}</Indicator>;
};
