import React from 'react';

import { Card, ICard } from '@front/components/card';

import css from './player-panel.scss';

interface IPlayerPanel {
  cards: ICard[];
}

export { ICard };

export const PlayerPanel: React.FC<IPlayerPanel> = ({ cards }) => {
  return (
    <div>
      Player panel
      <div className={css.cardsWrapper}>
        {cards.map((card, i) => (
          <Card key={`${card.name}-${i}`} {...card} />
        ))}
      </div>
    </div>
  );
};
