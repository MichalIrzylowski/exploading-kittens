import EventEmitter from 'eventemitter3';

import { Player } from '@server/classes/player';
import { Deck } from '@server/classes/deck';

import { payloadTypes } from '@shared/payload-types';
import { players, boards } from '@server/websocket';

import { broadCastToAllUsers } from '@server/utils/broad-cast-to-all-users';
import { broadCastGameMessage } from '@server/utils/broad-cast-game-message';

enum gameStages {
  notAbleToStart,
  readyToStart,
  started,
}

interface IBoard {
  id: string;
  players: Player[];
  deck: Deck;
  gameStage: gameStages;
}

const maxPlayers = 5;

export class Board extends EventEmitter implements IBoard {
  constructor(id: string, player: Player) {
    super();
    this.id = id;
    this.players = [player];
    this.deck = new Deck();
    this.gameStage = gameStages.notAbleToStart;
  }

  addPlayer(player: Player) {
    if (this.players.length === maxPlayers) {
      player.send(payloadTypes.errorTooManyPlayers);
      return;
    }

    if (this.gameStage === gameStages.started) {
      player.send(payloadTypes.errorGameHasAlreadyStarted);
      return;
    }

    broadCastToAllUsers(players, {
      type: payloadTypes.newPlayer,
      payload: this.id,
    });
    this.players.push(player);
    player.gameMessage(payloadTypes.joinedGame);

    const isReadyToStart = this.gameStage === gameStages.notAbleToStart;
    const are2Players = this.players.length >= 2;

    if (isReadyToStart && are2Players) {
      this.gameStage = gameStages.readyToStart;
      broadCastGameMessage(this.players, {
        type: payloadTypes.gameReadyToStart,
      });
      return;
    }

    if (this.players.length === 5) {
      this.gameStage = gameStages.started;
    }
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
    broadCastGameMessage(this.players, {
      type: payloadTypes.playerLeftBoard,
      payload: this.id,
    });
  }

  gameStage: gameStages;
  id: string;
  players: Player[];
  deck: Deck;
}
