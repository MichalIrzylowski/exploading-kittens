import { Card, cardTypes } from '@server/classes/card';
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
    let cardsLength = cards.length;
    let randomCard;

    while (cardsLength) {
      randomCard = Math.floor(Math.random() * cardsLength--);

      [cards[cardsLength], cards[randomCard]] = [cards[randomCard], cards[cardsLength]];
    }

    return this;
  }

  deal() {
    return this.cards.pop();
  }

  reset() {
    this.cards = prepareDeck();
  }

  prepareInitialHand() {
    const hand: Card[] = [];
    this.shuffle();

    while (hand.length < 7) {
      const card = this.deal();

      if (card?.type === cardTypes.exploading) {
        this.cards.unshift(card);
      } else if (card?.type === cardTypes.diffuse) {
        this.cards.unshift(card);
      } else {
        hand.push(card as Card);
      }
    }

    const diffuseIdx = this.cards.findIndex((card) => card.type === cardTypes.diffuse);
    const diffuseCard = this.cards.splice(diffuseIdx, 1);

    hand.push(diffuseCard[0]);

    return hand;
  }

  cards: Card[];
}
