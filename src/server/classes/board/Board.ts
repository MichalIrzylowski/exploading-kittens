import { Player } from '@server/classes/player';
import { Deck } from '@server/classes/deck';
import { Card, cardTypes } from '@server/classes/card';
import { players, boards } from '@server/websocket';

import { payloadTypes } from '@shared/payload-types';
import { socketStates } from '@shared/socket-states';
import { gameStages } from '@shared/game-stages';

import { broadCastToAllUsers } from '@server/utils/broad-cast-to-all-users';
import { actionTypes } from '@shared/action-types';
import { ISnackMessage, IGameMessagePayload } from '@shared/interfaces';
import { snackMessages } from '@shared/snack-messages';

import { gameReadyToStartMessage } from './consts';

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

    player.boardId = this.id;

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

      this.broadCastGameMessage(gameReadyToStartMessage);
    } else if (isReadyToStart) {
      player.gameMessage(gameReadyToStartMessage);
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
        payload: { gameStage: this.gameStage },
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

    this.currentPlayer = 0;
    this.broadCastGameMessage({
      action: actionTypes.setCurrentPlayer,
      payload: this.currentPlayer,
      snack: { message: snackMessages.currentPlayer, severity: 'info' },
    });

    this.deck.shuffle();
  }

  playCard(card: Card, playerId: string) {
    const { type } = card;
    const player = this.players.find((player) => player.getIdentification().id === playerId);
    const cards = this.deck.cards;

    switch (type) {
      case cardTypes.seeTheFuture: {
        player?.send(payloadTypes.seeTheFuture, [
          cards[cards.length - 1],
          cards[cards.length - 2],
          cards[cards.length - 3],
        ]);
        break;
      }

      default:
        throw new Error(`Unknown card type: ${type}`);
    }
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

  currentPlayer?: number;
  deck: Deck;
  gameStage: gameStages;
  id: string;
  players: Player[];
}
