import React from 'react';

import { Button, buttonAppearance } from '@front/components/button';
import { useBoardWebsocket } from '@front/contexts/board-websocket';
import { translate } from '@front/utils/translate';
import { sessionStorageItems } from '@front/shared/types';

import { payloadTypes } from '@shared/payload-types';
import { gameStages } from '@shared/game-stages';

import { PlayersList, IPlayer } from './players-list';

import * as localizations from './resources/localizations';

export { IPlayer };

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
  const didGameStart = props.gameStage === gameStages.started;

  return (
    <div>
      {isReadyToStart && (
        <Button onClick={handleStartGame} appearance={buttonAppearance.success}>
          {translations.startGame}
        </Button>
      )}
      {didGameStart && (
        <div>
          <PlayersList players={props.players} />
        </div>
      )}
    </div>
  );
};
