import EventEmitter from 'eventemitter3';

import { Player } from '@server/classes/player';
import { Deck } from '@server/classes/deck';
import { players, boards } from '@server/websocket';

import { payloadTypes } from '@shared/payload-types';
import { socketStates } from '@shared/socket-states';
import { gameStages } from '@shared/game-stages';

import { broadCastToAllUsers } from '@server/utils/broad-cast-to-all-users';

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

    const currentPlayers = this.players.map((player) =>
      player.getIdentification()
    );
    this.broadCastSnacks(payloadTypes.playerJoinedSnackSuccess, {
      currentPlayers,
    });

    const isReadyToStart = this.players.length > 1;

    player.snackMessage(payloadTypes.joinedBoardSnackSuccess, 'main', {
      boardId: this.id,
      isReadyToStart,
      currentPlayers,
    });

    if (this.gameStage === gameStages.notAbleToStart && isReadyToStart) {
      this.gameStage = gameStages.readyToStart;
      this.broadCastGameMessage(
        payloadTypes.gameReadyToStart,
        gameStages.readyToStart
      );
      return;
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

    this.broadCastSnacks(payloadTypes.playerLeftBoardSnackInfo);

    if (this.players.length < 2) {
      this.gameStage = gameStages.notAbleToStart;
      this.broadCastGameMessage(
        payloadTypes.gameNotAbleToStart,
        payloadTypes.gameNotAbleToStart
      );
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

  broadCastSnacks(type: payloadTypes, payload?: any, players = this.players) {
    console.log(type);
    players.forEach((player) => {
      player.snackMessage(type, 'game', payload);
    });
  }

  gameStage: gameStages;
  id: string;
  players: Player[];
  deck: Deck;
}
