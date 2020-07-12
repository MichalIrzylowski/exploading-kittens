import React from 'react';
import classNames from 'classnames';

import { cardNames, cardColors } from '@server/classes/card';

import css from './card.scss';

export interface ICard {
  color: cardColors;
  name: cardNames;
  type: string;
  onPlayCard: () => void;
}

export const Card: React.FC<ICard> = ({ color, name, type, onPlayCard }) => (
  <button className={classNames(css.card, css[color])} onClick={onPlayCard}>
    <h5>{name}</h5>
    <h6>{type}</h6>
  </button>
);
