import React, { useState, useEffect } from 'react';

import {
  SnackBarGroup,
  SnackbarMessage,
} from '@front/components/snack-bar-group';

import { useBoardWebsocket } from '@front/contexts/board-websocket';
import { useMainWebsocket } from '@front/contexts/main-websocket';

import { translate } from '@front/utils/translate';

import { sessionStorageItems } from '@front/shared/types';

import { gameStages } from '@shared/game-stages';
import { payloadTypes } from '@shared/payload-types';

import { snackMessageCreator } from './helpers/message-creator';
import * as localizations from './resources/localizations';

interface IPlayer {
  id: string;
  name: string;
}

export const BoardPlay: React.FC = () => {
  const translations = translate(localizations);
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [gameStage, setGameStage] = useState<gameStages>(
    gameStages.notAbleToStart
  );
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const gameWS = useBoardWebsocket();
  const mainWS = useMainWebsocket();

  const handleSnackBar = (data: any) => {
    const newMessage = snackMessageCreator(
      translations[data.message],
      data.severity
    );
    setSnackPack([...snackPack, newMessage]);
  };
  const handleBoardCreation = (data: any) => {
    const currentUser = JSON.parse(
      sessionStorage.getItem(sessionStorageItems.user) as string
    ) as IPlayer;
    setPlayers([currentUser]);
    handleSnackBar(data);
  };
  const handleJoinBoardMessage = ({
    boardId,
    isReadyToStart,
    currentPlayers,
    ...restData
  }: any) => {
    sessionStorage.setItem(sessionStorageItems.currentGame, boardId);
    if (isReadyToStart) setGameStage(gameStages.readyToStart);
    setPlayers(currentPlayers);
    handleSnackBar(restData);
  };
  const handleGameStageUpdate = (data: gameStages) => {
    setGameStage(data);
  };
  const handleJoinPlayer = ({ currentPlayers, ...restData }: any) => {
    setPlayers(currentPlayers);
    handleSnackBar(restData);
  };

  useEffect(() => {
    mainWS.on(payloadTypes.joinedBoardSnackSuccess, handleJoinBoardMessage);

    gameWS.on(payloadTypes.boardCreatedSnackSuccess, handleBoardCreation);
    gameWS.on(payloadTypes.playerLeftBoardSnackInfo, handleSnackBar);
    gameWS.on(payloadTypes.playerJoinedSnackSuccess, handleJoinPlayer);
    gameWS.on(payloadTypes.gameNotAbleToStart, handleGameStageUpdate);
    gameWS.on(payloadTypes.gameReadyToStart, handleGameStageUpdate);
    gameWS.on(payloadTypes.gameStarted, handleGameStageUpdate);

    return () => {
      mainWS.off(payloadTypes.joinedBoardSnackSuccess, handleJoinBoardMessage);
    };
  }, []);

  return (
    <div>
      <h1>{translations[gameStage]}</h1>
      <SnackBarGroup snackPack={snackPack} setSnackPack={setSnackPack} />
    </div>
  );
};
