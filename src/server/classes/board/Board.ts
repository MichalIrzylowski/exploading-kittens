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

    this.players.push(player);

    broadCastToAllUsers(players, {
      type: payloadTypes.newPlayer,
      payload: this.id,
    });

    const currentPlayers = this.players.map((player) => ({
      isOnline: player.socket.readyState === socketStates.open,
      ...player.getIdentification(),
    }));
    this.broadCastSnacks(payloadTypes.playerJoinedSnackSuccess, {
      currentPlayers,
    });

    const isReadyToStart = this.players.length > 1;

    player.snackMessage(payloadTypes.joinedBoardSnackSuccess, {
      boardId: this.id,
      isReadyToStart,
      currentPlayers,
    });

    if (this.gameStage === gameStages.notAbleToStart && isReadyToStart) {
      this.gameStage = gameStages.readyToStart;
      this.broadCastGameMessage(payloadTypes.gameReadyToStart, gameStages.readyToStart);
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

    const isGameStarted = this.gameStage === gameStages.started;

    this.players = this.players.filter((player) => player.getIdentification().id !== id);

    broadCastToAllUsers(players, {
      type: payloadTypes.playerLeftBoard,
      payload: this.id,
    });

    this.broadCastSnacks(payloadTypes.playerLeftBoardSnackInfo, {
      id,
      isStarted: isGameStarted,
    });

    if (this.players.length < 2 && !isGameStarted) {
      this.gameStage = gameStages.notAbleToStart;
      this.broadCastGameMessage(payloadTypes.gameNotAbleToStart, payloadTypes.gameNotAbleToStart);
    }
  }

  startGame() {
    if (this.gameStage === gameStages.readyToStart) {
      this.gameStage = gameStages.started;

      this.broadCastSnacks(payloadTypes.gameStartedSnackSuccess);
    }

    this.deck.shuffle();

    this.players.forEach((player) => {
      const initialhand = this.deck.prepareInitialHand();
      const deckCards = this.deck.cards.length;

      player.gameMessage(payloadTypes.initialHand, { initialhand, deckCards });

      const restPlayers = this.players.filter(
        (otherPlayer) => otherPlayer.getIdentification().id !== player.getIdentification().id
      );
      this.broadCastGameMessage(
        payloadTypes.otherPlayerRecivedCard,
        { cardsLength: initialhand.length, player: player.getIdentification().id, deckCards },
        restPlayers
      );
    });

    this.deck.shuffle();
  }

  broadCastGameMessage(type: payloadTypes, payload?: any, players = this.players) {
    players.forEach((player) => {
      player.gameMessage(type, payload);
    });
  }

  broadCastSnacks(type: payloadTypes, payload?: any, players = this.players) {
    players.forEach((player) => {
      player.snackMessage(type, payload);
    });
  }

  gameStage: gameStages;
  id: string;
  players: Player[];
  deck: Deck;
}
