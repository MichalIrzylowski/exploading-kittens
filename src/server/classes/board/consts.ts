import { actionTypes } from '@shared/action-types';
import { snackMessages } from '@shared/snack-messages';
import { gameStages } from '@shared/game-stages';
import { IGameMessagePayload } from '@shared/interfaces';

export const gameReadyToStartMessage: IGameMessagePayload = {
  action: actionTypes.setGameStage,
  snack: { message: snackMessages.gameReadyToStart, severity: 'success' },
  payload: { gameStage: gameStages.readyToStart },
};
