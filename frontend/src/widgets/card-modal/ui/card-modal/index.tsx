import { Suspense, type FC } from 'react';

import { CardModalVisual, type Props } from './visual';
import { CardModalSkeleton } from './skeleton';

export const CardModal: FC<Props> = (props) => (
  <Suspense fallback={<CardModalSkeleton closeModal={props.closeModal} />}>
    <CardModalVisual {...props} />
  </Suspense>
);
