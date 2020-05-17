import EventEmitter from 'eventemitter3';

import { Player } from '@server/classes/player';
import { Deck } from '@server/classes/deck';
import { players, boards } from '@server/websocket';

import { payloadTypes } from '@shared/payload-types';
import { socketStates } from '@shared/socket-states';

import { broadCastToAllUsers } from '@server/utils/broad-cast-to-all-users';

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

    this.players.push(player);

    broadCastToAllUsers(players, {
      type: payloadTypes.newPlayer,
      payload: this.id,
    });
    this.broadCastGameMessage(
      payloadTypes.newPlayer,
      player.getIdentification()
    );

    const isReadyToStart = this.gameStage === gameStages.notAbleToStart;
    const are2Players = this.players.length >= 2;

    player.send(payloadTypes.joinedGame);
    if (player.sockets.game?.readyState !== socketStates.open) {
      player.send(payloadTypes.gameReadyToStart);
    }

    if (isReadyToStart && are2Players) {
      this.gameStage = gameStages.readyToStart;
      this.broadCastGameMessage(payloadTypes.gameReadyToStart);
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
    this.broadCastGameMessage(payloadTypes.playerLeftBoard, id);

    if (this.players.length < 2) {
      this.gameStage = gameStages.notAbleToStart;
      this.broadCastGameMessage(payloadTypes.gameNotAbleToStart);
    }
  }

  broadCastGameMessage(
    type: payloadTypes,
    payload?: any,
    players = this.players
  ) {
    players.forEach((player) => {
      player.gameMessage(type, payload);
    });
  }

  gameStage: gameStages;
  id: string;
  players: Player[];
  deck: Deck;
}
