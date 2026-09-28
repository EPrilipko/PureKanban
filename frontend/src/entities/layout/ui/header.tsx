import type { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { useLayoutStore } from '../libs';

export const PageHeader: FC<PropsWithChildren> = ({ children }) => {
  const { headerRef } = useLayoutStore();

  if (!headerRef) {
    return null;
  }

  return createPortal(children, headerRef);
};
