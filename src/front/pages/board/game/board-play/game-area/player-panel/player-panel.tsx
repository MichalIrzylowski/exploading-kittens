import React from 'react';

import { Card, ICard } from '@front/components/card';
import { translate } from '@front/utils/translate';

import * as localizations from './resources/localizations';
import css from './player-panel.scss';

interface IPlayerPanel {
  cards: ICard[];
}

export { ICard };

export const PlayerPanel: React.FC<IPlayerPanel> = ({ cards }) => {
  const translations = translate(localizations);
  return (
    <div>
      Player panel
      <div className={css.cardsWrapper}>
        {cards.map((card, i) => (
          <Card key={`${card.name}-${i}`} name={card.name} color={card.color} type={translations[card.type]} />
        ))}
      </div>
    </div>
  );
};
