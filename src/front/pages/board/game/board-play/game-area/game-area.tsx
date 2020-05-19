import React from 'react';

import { Button, buttonAppearance } from '@front/components/button';
import { useBoardWebsocket } from '@front/contexts/board-websocket';
import { translate } from '@front/utils/translate';
import { sessionStorageItems } from '@front/shared/types';

import { payloadTypes } from '@shared/payload-types';
import { gameStages } from '@shared/game-stages';

import * as localizations from './resources/localizations';

export interface IPlayer {
  id: string;
  name: string;
  isOnline: boolean;
}

interface IGameArea {
  players: IPlayer[];
  gameStage: gameStages;
}

export const GameArea: React.FC<IGameArea> = (props) => {
  const ws = useBoardWebsocket();
  const translations = translate(localizations);

  const boardId = sessionStorage.getItem(
    sessionStorageItems.currentGame
  ) as string;

  const handleStartGame = () => ws.send(payloadTypes.startGame, boardId);

  const isReadyToStart = props.gameStage === gameStages.readyToStart;

  return (
    <div>
      {isReadyToStart && (
        <Button onClick={handleStartGame} appearance={buttonAppearance.success}>
          {translations.startGame}
        </Button>
      )}
    </div>
  );
};
