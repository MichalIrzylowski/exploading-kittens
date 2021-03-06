import { actionTypes } from '@shared/action-types';
import { gameStages } from '@shared/game-stages';

import { IPlayer } from '@front/pages/game/board/players-list';
import { ICard } from '@front/pages/game/board/player-panel';

interface IGameState {
  gameStage: gameStages;
  players: IPlayer[];
  cards: ICard[];
  deckCardsAmount: number;
  currentPlayer: number;
}

type TPartialGameState = Partial<IGameState>;

export const initialState: TPartialGameState = {
  gameStage: gameStages.notAbleToStart,
  players: [],
  cards: [],
  deckCardsAmount: 56,
  currentPlayer: 0,
};

export const gameReducer = (state: TPartialGameState, action: any) => {
  switch (action.type) {
    case actionTypes.playerJoinedBoard: {
      return { ...state, players: action.payload.currentPlayers };
    }

    case actionTypes.setGameStage: {
      return { ...state, gameStage: action.payload.gameStage };
    }

    case actionTypes.playerLeftBoard: {
      const { playerId } = action.payload;
      let players;

      if (state.gameStage === gameStages.started) {
        players = state.players?.map((player) => {
          if (player.id === playerId) player.isOnline = false;
          return player;
        });
      } else players = state.players?.filter((player) => player.id !== playerId);

      return { ...state, players };
    }

    case actionTypes.initialHand: {
      return { ...state, cards: action.payload.initialhand };
    }

    case actionTypes.otherPlayerRecievedCards: {
      const newHandedPlayers = state.players?.map((player) => {
        if (player.id === action.payload.playerId) {
          if (!player.handLength) player.handLength = 0;
          player.handLength += action.payload.recievedCardsAmount;
        }

        return player;
      });

      return { ...state, players: newHandedPlayers, deckCardsAmount: action.payload.deckCardsAmount };
    }

    case actionTypes.setCurrentPlayer: {
      return { ...state, currentPlayer: action.payload };
    }

    default:
      return state;
  }
};
