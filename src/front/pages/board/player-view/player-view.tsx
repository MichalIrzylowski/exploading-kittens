import React, { useState, useEffect } from 'react';

import { Button, buttonAppearance } from '@front/components/button';
import { PlayersList, IPlayer } from './players-list';
import { PlayerPanel, ICard } from './player-panel';

import { useWebSocket } from '@front/contexts/main-websocket';
import { useSnackBar } from '@front/contexts/snack-bar-context';

import { translate } from '@front/utils/translate';

import { sessionStorageItems } from '@front/shared/types';

import { gameStages } from '@shared/game-stages';
import { payloadTypes } from '@shared/payload-types';

import { snackMessageCreator } from './helpers/message-creator';
import * as localizations from './resources/localizations';
import css from './player-view.scss';

export const PlayerView: React.FC = () => {
  const translations = translate(localizations);
  const [gameStage, setGameStage] = useState<gameStages>(gameStages.notAbleToStart);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const [leftCards, setLeftCards] = useState(56);
  const ws = useWebSocket();
  const sendSnackBar = useSnackBar();

  const handleSnackBar = (data: any) => {
    const newMessage = snackMessageCreator(translations[data.message], data.severity);
    sendSnackBar((snackPack) => [...snackPack, newMessage]);
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

  const handleClick = () => ws.send(payloadTypes.startGame, sessionStorage.getItem(sessionStorageItems.currentGame));

  useEffect(() => {
    ws.on(payloadTypes.joinedBoardSnackSuccess, handleJoinBoardMessage);
    ws.on(payloadTypes.boardCreatedSnackSuccess, handleBoardCreation);
    ws.on(payloadTypes.playerLeftBoardSnackInfo, handlePlayerLeave);
    ws.on(payloadTypes.playerJoinedSnackSuccess, handleJoinPlayer);
    ws.on(payloadTypes.gameNotAbleToStart, handleGameStageUpdate);
    ws.on(payloadTypes.gameReadyToStart, handleGameStageUpdate);
    ws.on(payloadTypes.gameStarted, handleGameStageUpdate);
    ws.on(payloadTypes.gameStartedSnackSuccess, handleStartGame);
    ws.on(payloadTypes.initialHand, handleInitialHand);

    return () => {
      ws.off(payloadTypes.joinedBoardSnackSuccess, handleJoinBoardMessage);
      ws.off(payloadTypes.boardCreatedSnackSuccess, handleBoardCreation);
      ws.off(payloadTypes.playerLeftBoardSnackInfo, handlePlayerLeave);
      ws.off(payloadTypes.playerJoinedSnackSuccess, handleJoinPlayer);
      ws.off(payloadTypes.gameNotAbleToStart, handleGameStageUpdate);
      ws.off(payloadTypes.gameReadyToStart, handleGameStageUpdate);
      ws.off(payloadTypes.gameStarted, handleGameStageUpdate);
      ws.off(payloadTypes.gameStartedSnackSuccess, handleStartGame);
      ws.off(payloadTypes.initialHand, handleInitialHand);
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
      <PlayersList players={players} />
      <PlayerPanel cards={cards} />
    </>
  );
};
