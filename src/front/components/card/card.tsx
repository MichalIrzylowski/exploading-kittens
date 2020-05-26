import React from 'react';

import { cardTypes, cardNames, cardColors } from '@server/classes/card';

import css from './card.scss';

export interface ICard {
  color: cardColors;
  name: cardNames;
  type: cardTypes;
}

export const Card: React.FC<ICard> = ({ color, name, type }) => {
  return (
    <div className={css.card}>
      <h5>{name}</h5>
      <h6>{type}</h6>
    </div>
  );
};
