import { Player } from '@server/classes/player';
import { Deck } from '@server/classes/deck';
import { players, boards } from '@server/websocket';

import { payloadTypes } from '@shared/payload-types';
import { socketStates } from '@shared/socket-states';
import { gameStages } from '@shared/game-stages';

import { broadCastToAllUsers } from '@server/utils/broad-cast-to-all-users';
import { actionTypes } from '@shared/action-types';
import { ISnackMessage, IGameMessagePayload } from '@shared/interfaces';
import { snackMessages } from '@shared/snack-messages';

interface IBoard {
  id: string;
  players: Player[];
  deck: Deck;
  gameStage: gameStages;
  currentPlayer?: number;
}

const maxPlayers = 5;

export class Board implements IBoard {
  constructor(id: string, player: Player) {
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

    player.isPlaying = this.id;

    this.players.push(player);

    broadCastToAllUsers(players, {
      type: payloadTypes.newPlayer,
      payload: this.id,
    });

    const currentPlayers = this.players.map((player) => ({
      isOnline: player.socket.readyState === socketStates.open,
      ...player.getIdentification(),
    }));

    this.broadCastGameMessage({
      action: actionTypes.playerJoinedBoard,
      snack: { message: snackMessages.playerJoinedBoard, severity: 'success' },
      payload: { currentPlayers },
    });

    const isReadyToStart = this.players.length > 1;

    if (this.gameStage === gameStages.notAbleToStart && isReadyToStart) {
      this.gameStage = gameStages.readyToStart;

      this.broadCastGameMessage({
        action: actionTypes.setGameStage,
        snack: { message: snackMessages.gameReadyToStart, severity: 'success' },
        payload: { gameStage: this.gameStage },
      });
    }
  }

  removePlayer(id: string) {
    const isGameStarted = this.gameStage === gameStages.started;
    this.players = this.players.filter((player) => player.getIdentification().id !== id);

    if (!this.players.length) {
      broadCastToAllUsers(players, {
        type: payloadTypes.boardDeleted,
        payload: this.id,
      });

      return boards.delete(this.id);
    }

    broadCastToAllUsers(players, {
      type: payloadTypes.playerLeftBoard,
      payload: this.id,
    });

    this.broadCastGameMessage({
      action: actionTypes.playerLeftBoard,
      snack: { message: snackMessages.playerLeftBoard, severity: 'info' },
      payload: { playerId: id },
    });

    if (this.players.length < 2 && !isGameStarted) {
      this.gameStage = gameStages.notAbleToStart;
      this.broadCastGameMessage({
        action: actionTypes.setGameStage,
        snack: { message: snackMessages.gameNotReadyToStart, severity: 'warning' },
        payload: { gameStage: this.gameStage },
      });
    }
  }

  startGame() {
    if (this.gameStage === gameStages.readyToStart) {
      this.gameStage = gameStages.started;

      this.broadCastGameMessage({
        action: actionTypes.setGameStage,
        snack: { message: snackMessages.gameStarted, severity: 'success' },
        payload: { gameMessage: this.gameStage },
      });
    } else {
      this.broadCastSnacks({ message: snackMessages.gameNotReadyToStart, severity: 'error' });
      return;
    }

    this.deck.shuffle();

    this.players.forEach((player) => {
      const initialhand = this.deck.prepareInitialHand();
      const deckCardsAmount = this.deck.cards.length;

      player.hand = initialhand;
      player.gameMessage({ action: actionTypes.initialHand, payload: { initialhand, deckCardsAmount } });

      const restPlayers = this.players.filter(
        (otherPlayer) => otherPlayer.getIdentification().id !== player.getIdentification().id
      );

      this.broadCastGameMessage(
        {
          action: actionTypes.otherPlayerRecievedCards,
          payload: {
            recievedCardsAmount: initialhand.length,
            playerId: player.getIdentification().id,
            deckCardsAmount,
          },
        },
        restPlayers
      );
    });

    this.deck.shuffle();
  }

  broadCastGameMessage(payload: IGameMessagePayload, players = this.players) {
    players.forEach((player) => {
      player.gameMessage(payload);
    });
  }

  broadCastSnacks(payload: ISnackMessage, players = this.players) {
    players.forEach((player) => {
      player.snackMessage(payload);
    });
  }

  gameStage: gameStages;
  id: string;
  players: Player[];
  deck: Deck;
}
