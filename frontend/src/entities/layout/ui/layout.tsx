import type { FC, ReactNode, PropsWithChildren } from 'react';
import { AppShell, AppShellFooter, AppShellHeader, AppShellMain } from '@mantine/core';

import { useLayoutStore } from '../libs';

export interface Props {
  slots?: {
    Footer?: ReactNode;
  };
}

export const Layout: FC<PropsWithChildren<Props>> = ({ slots, children }) => {
  const { setHeaderRef } = useLayoutStore();

  return (
    <AppShell
      header={{ height: 60 }}
      styles={{
        root: {
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <AppShellHeader ref={setHeaderRef} />

      <AppShellMain
        styles={{
          main: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {children}
      </AppShellMain>

      {slots?.Footer && <AppShellFooter>{slots.Footer}</AppShellFooter>}
    </AppShell>
  );
};
