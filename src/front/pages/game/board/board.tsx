import React, { useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';

import { Button, buttonAppearance } from '@front/components/button';
import { gameReducer, initialState } from '@front/logic/game-reducer';

import { useWebSocket } from '@front/contexts/main-websocket';
import { useSnackBar, SnackbarMessage } from '@front/contexts/snack-bar-context';

import { translate } from '@front/utils/translate';

import { sessionStorageItems } from '@front/shared/types';

import { gameStages } from '@shared/game-stages';
import { payloadTypes } from '@shared/payload-types';
import { IGameMessagePayload } from '@shared/interfaces';
import { snackMessages } from '@shared/snack-messages';

import { PlayersList } from './players-list';
import { PlayerPanel } from './player-panel';
import * as localizations from './resources/localizations';
import css from './board.scss';

export const PlayerView: React.FC = () => {
  const translations = translate(localizations);
  const [state, dispatch] = useReducer(logger(gameReducer), initialState);
  const ws = useWebSocket();
  const sendSnackBar = useSnackBar();

  const handleGameStateUpdate = (gameMessagePayload: IGameMessagePayload) => {
    const { action, payload } = gameMessagePayload;
    if (gameMessagePayload.snack) {
      const { message, severity } = gameMessagePayload.snack;
      const snackBarMessage: SnackbarMessage = {
        message: snackMessages[message],
        key: Date.now(),
        severity,
      };

      sendSnackBar((prevMessages) => [...prevMessages, snackBarMessage]);
    }

    dispatch({ type: action, payload });
  };

  useEffect(() => {
    ws.on(payloadTypes.game, handleGameStateUpdate);
    return () => {
      ws.off(payloadTypes.game, handleGameStateUpdate);
    };
  }, []);

  const handleClick = () => ws.send(payloadTypes.startGame, sessionStorage.getItem(sessionStorageItems.currentGame));

  return (
    <>
      <div className={css.header}>
        <h1>{translations[state.gameStage as string]}</h1>
        {state.gameStage === gameStages.readyToStart && (
          <Button onClick={handleClick} appearance={buttonAppearance.success}>
            {translations.startGame}
          </Button>
        )}
      </div>
      <PlayersList players={state.players as any} />
      <PlayerPanel cards={state.cards as any} />
    </>
  );
};
