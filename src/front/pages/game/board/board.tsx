import React, { useEffect, useReducer, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import logger from 'use-reducer-logger';

import { IPlayer } from '@front/pages/game/board/players-list';

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

export const Board: React.FC = () => {
  const translations = translate(localizations);
  const [state, dispatch] = useReducer(logger(gameReducer), initialState);
  const { id } = useParams();
  const ws = useWebSocket();
  const sendSnackBar = useSnackBar();
  const userId = JSON.parse(sessionStorage.getItem(sessionStorageItems.user) as string).id;

  const handleGameStateUpdate = (gameMessagePayload: IGameMessagePayload) => {
    const { action, payload, snack } = gameMessagePayload;
    if (snack) {
      const { message, severity } = snack;
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
    const currentGame = sessionStorage.getItem(sessionStorageItems.currentGame);
    if (!currentGame) {
      const payload = { boardId: id, userId };
      ws.send(payloadTypes.joinGame, payload);
      sessionStorage.setItem(sessionStorageItems.currentGame, id);
    }

    ws.on(payloadTypes.game, handleGameStateUpdate);
    return () => {
      ws.off(payloadTypes.game, handleGameStateUpdate);
    };
  }, []);

  const handleClick = useCallback(
    () => ws.send(payloadTypes.startGame, sessionStorage.getItem(sessionStorageItems.currentGame)),
    []
  );

  const currentPlayer = state.players ? state.players[state.currentPlayer as number] : null;
  const isYourTurn = currentPlayer?.id === userId;

  return (
    <>
      <div className={css.header}>
        <h1>{translations[state.gameStage as string]}</h1>
        {state.gameStage === gameStages.readyToStart && (
          <Button onClick={handleClick} appearance={buttonAppearance.success}>
            {translations.startGame}
          </Button>
        )}
        {state.gameStage === gameStages.started && (
          <h2>{isYourTurn ? translations.yourTurn : `${translations.currentPlayer} ${currentPlayer?.name}`}</h2>
        )}
      </div>
      <PlayersList players={state.players as any} />
      <PlayerPanel cards={state.cards as any} />
    </>
  );
};
