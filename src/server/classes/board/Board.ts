import EventEmitter from 'eventemitter3';

import { Player } from '@server/classes/player';
import { Deck } from '@server/classes/deck';

import { payloadTypes } from '@shared/payload-types';

interface IBoard {
  id: string;
  players: Player[];
  deck: Deck;
}

const maxPlayers = 5;

export class Board extends EventEmitter implements IBoard {
  // TODO: it has to accept player in constructor as well
  constructor(id: string) {
    super();
    this.id = id;
    this.players = [];
    this.deck = new Deck();
  }

  addPlayer(player: Player) {
    if (this.players.length === maxPlayers) {
      player.send(payloadTypes.tooManyPlayers);
    }
  }

  id: string;
  players: Player[];
  deck: Deck;
}
