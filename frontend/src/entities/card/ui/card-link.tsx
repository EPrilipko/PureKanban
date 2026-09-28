import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Anchor } from '@mantine/core';

import { type CardNameFragment, CardLinkClickEvent } from '../model';

interface Props {
  card: CardNameFragment;
  to: string;
}

export const CardLink: FC<Props> = ({ card, to }) => {
  const onClick = () => {
    window.dispatchEvent(new CardLinkClickEvent(card.id));
  };

  return (
    <Anchor component={Link} to={to} onClick={onClick} underline="never" fw="700" target="_self">
      {card.name}
    </Anchor>
  );
};
