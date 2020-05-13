import { Card } from '@server/classes/card';
import { prepareDeck } from '@server/helpers/prepare-deck';

interface IDeck {
  cards: Card[];
}

export class Deck implements IDeck {
  constructor() {
    this.cards = prepareDeck();
  }

  shuffle() {
    const { cards } = this;
    let cardsLength = cards.length,
      randomCard;

    while (cardsLength) {
      randomCard = Math.floor(Math.random() * cardsLength--);

      [cards[cardsLength], cards[randomCard]] = [
        cards[randomCard],
        cards[cardsLength],
      ];
    }

    return this;
  }

  deal() {
    return this.cards.pop();
  }

  reset() {
    this.cards = prepareDeck();
  }

  cards: Card[];
}
