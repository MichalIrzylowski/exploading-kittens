import * as cardData from './card-data';

export interface ICard {
  type: cardData.cardTypes;
  name: cardData.cardNames;
  color: cardData.cardColors;
}

export class Card implements ICard {
  constructor({ type, name, color }: ICard) {
    this.type = type;
    this.name = name;
    this.color = color;
  }
  type: cardData.cardTypes;
  name: cardData.cardNames;
  color: cardData.cardColors;
}
