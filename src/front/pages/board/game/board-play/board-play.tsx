import React, { useState, useEffect } from 'react';

import { SnackBarGroup, SnackbarMessage } from '@front/components/snack-bar-group';
import { Button, buttonAppearance } from '@front/components/button';

import { useBoardWebsocket } from '@front/contexts/board-websocket';
import { useMainWebsocket } from '@front/contexts/main-websocket';

import { translate } from '@front/utils/translate';

import { sessionStorageItems } from '@front/shared/types';

import { gameStages } from '@shared/game-stages';
import { payloadTypes } from '@shared/payload-types';

import { GameArea, IPlayer, ICard } from './game-area';
import { snackMessageCreator } from './helpers/message-creator';
import * as localizations from './resources/localizations';
import css from './board-play.scss';

export const BoardPlay: React.FC = () => {
  const translations = translate(localizations);
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [gameStage, setGameStage] = useState<gameStages>(gameStages.notAbleToStart);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const [leftCards, setLeftCards] = useState(56);
  const gameWS = useBoardWebsocket();
  const mainWS = useMainWebsocket();

  const handleSnackBar = (data: any) => {
    const newMessage = snackMessageCreator(translations[data.message], data.severity);
    setSnackPack([...snackPack, newMessage]);
  };
  const handleBoardCreation = (data: any) => {
    setPlayers([]);
    handleSnackBar(data);
  };
  const handleJoinBoardMessage = ({ boardId, isReadyToStart, currentPlayers, ...restData }: any) => {
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
  const handleStartGame = (data: any) => {
    setGameStage(gameStages.started);
    handleSnackBar(data);
  };
  const handlePlayerLeave = ({ id, isStarted, ...restData }: any) => {
    setPlayers((prevState) =>
      isStarted
        ? prevState.map((player) => {
            const newPlayer = Object.assign(player);
            if (player.id === id) newPlayer.isOnline = false;
            return newPlayer;
          })
        : prevState.filter((player) => player.id !== id)
    );
    handleSnackBar(restData);
  };
  const handleInitialHand = ({ initialhand, deckCards }: any) => {
    setCards(initialhand);
    setLeftCards(deckCards);
  };

  const handleClick = () =>
    gameWS.send(payloadTypes.startGame, sessionStorage.getItem(sessionStorageItems.currentGame));

  useEffect(() => {
    mainWS.on(payloadTypes.joinedBoardSnackSuccess, handleJoinBoardMessage);

    gameWS.on(payloadTypes.boardCreatedSnackSuccess, handleBoardCreation);
    gameWS.on(payloadTypes.playerLeftBoardSnackInfo, handlePlayerLeave);
    gameWS.on(payloadTypes.playerJoinedSnackSuccess, handleJoinPlayer);
    gameWS.on(payloadTypes.gameNotAbleToStart, handleGameStageUpdate);
    gameWS.on(payloadTypes.gameReadyToStart, handleGameStageUpdate);
    gameWS.on(payloadTypes.gameStarted, handleGameStageUpdate);
    gameWS.on(payloadTypes.gameStartedSnackSuccess, handleStartGame);
    gameWS.on(payloadTypes.initialHand, handleInitialHand);

    return () => {
      mainWS.off(payloadTypes.joinedBoardSnackSuccess, handleJoinBoardMessage);
    };
  }, []);

  return (
    <>
      <div className={css.header}>
        <h1>{translations[gameStage]}</h1>
        {gameStage === gameStages.readyToStart && (
          <Button onClick={handleClick} appearance={buttonAppearance.success}>
            {translations.startGame}
          </Button>
        )}
      </div>
      <GameArea players={players} cards={cards} />
      <SnackBarGroup snackPack={snackPack} setSnackPack={setSnackPack} />
    </>
  );
};
