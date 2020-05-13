import { Player } from '@server/classes/player';
import { Deck } from '@server/classes/deck';

interface IBoard {
  id: string;
  players: Player[];
  deck: Deck;
}

export class Board implements IBoard {
  constructor(id: string) {
    this.id = id;
    this.players = [];
    this.deck = new Deck();
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  id: string;
  players: Player[];
  deck: Deck;
}
