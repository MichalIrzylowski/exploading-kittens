import React, { useEffect } from 'react';

import { useBoardWebsocket } from '@front/contexts/board-websocket';
import { Button, buttonAppearance } from '@front/components/button';
import { localStorageItems } from '@front/shared/types';

import { customEvents } from '@shared/events';
import { payloadTypes } from '@shared/payload-types';

interface IBoardCreator {
  setNewBoard: (id: string) => void;
}

export const BoardCreator: React.FC<IBoardCreator> = ({ setNewBoard }) => {
  const ws = useBoardWebsocket();

  const handleClick = () => {
    const player = localStorage.getItem(localStorageItems.user);
    if (player) {
      ws.send(payloadTypes.createBoard, JSON.parse(player));
    } else {
      ws.emit(customEvents.userNotRegistered);
    }
  };

  const handleBoardCreation = (id: string) => {
    setNewBoard(id);
    localStorage.setItem(localStorageItems.currentGame, id);
  };

  useEffect(() => {
    ws.on(payloadTypes.boardCreated, handleBoardCreation);
  }, []);
  return (
    <Button appearance={buttonAppearance.primary} onClick={handleClick}>
      Create Game
    </Button>
  );
};
