import { Player } from '@server/classes/player';
import { Card } from '@server/classes/card';
import { prepareDeck } from '@server/helpers/prepare-deck';

interface IBoard {
  players: Player[];
  deck: Card[];
}

export class Board implements IBoard {
  constructor() {
    this.players = [];
    this.deck = prepareDeck();
  }

  players: Player[];
  deck: Card[];
}
