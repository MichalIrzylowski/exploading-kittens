import { Card, catsNames, cardNames } from '../card';

export interface IHand {
  cards: Card[];
}

export class Hand implements IHand {
  constructor(cards: Card[]) {
    this.cards = cards;
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  removeCard(cardName: cardNames) {
    this.cards = this.cards.filter(({ name }) => name !== cardName);
  }

  cards: Card[];
}
