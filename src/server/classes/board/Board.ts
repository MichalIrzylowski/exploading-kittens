import EventEmitter from 'eventemitter3';

import { Player } from '@server/classes/player';
import { Deck } from '@server/classes/deck';

import { payloadTypes } from '@shared/payload-types';
import { players, boards } from '@server/websocket';

import { broadCastToAllUsers } from '@server/utils/broad-cast-to-all-users';

interface IBoard {
  id: string;
  players: Player[];
  deck: Deck;
}

const maxPlayers = 5;

export class Board extends EventEmitter implements IBoard {
  constructor(id: string, player: Player) {
    super();
    this.id = id;
    this.players = [player];
    this.deck = new Deck();
  }

  addPlayer(player: Player) {
    if (this.players.length === maxPlayers) {
      player.send(payloadTypes.tooManyPlayers);
      return;
    }

    this.players.push(player);
    player.send(payloadTypes.joinedGame);
  }

  removePlayer(id: string) {
    if (!(this.players.length - 1)) {
      broadCastToAllUsers(players, {
        type: payloadTypes.boardDeleted,
        payload: this.id,
      });

      return boards.delete(this.id);
    }

    this.players = this.players.filter(
      (player) => player.getIdentification().id !== id
    );

    broadCastToAllUsers(players, {
      type: payloadTypes.playerLeftBoard,
      payload: this.id,
    });
  }

  id: string;
  players: Player[];
  deck: Deck;
}
