import React, { useEffect } from 'react';

import Button from '@material-ui/core/Button';

import { useBoardWebsocket } from '@front/contexts/board-websocket';
import { sessionStorageItems } from '@front/shared/types';

import { customEvents } from '@shared/events';
import { payloadTypes } from '@shared/payload-types';

interface IBoardCreator {
  setNewBoard: (id: string) => void;
}

export const BoardCreator: React.FC<IBoardCreator> = ({ setNewBoard }) => {
  const ws = useBoardWebsocket();

  const handleClick = () => {
    const player = sessionStorage.getItem(sessionStorageItems.user);
    if (player) {
      ws.send(payloadTypes.createBoard, JSON.parse(player));
    } else {
      ws.emit(customEvents.userNotRegistered);
    }
  };

  const handleBoardCreation = (id: string) => {
    setNewBoard(id);
    sessionStorage.setItem(sessionStorageItems.currentGame, id);
  };

  useEffect(() => {
    ws.on(payloadTypes.boardCreated, handleBoardCreation);

    return () => {
      ws.off(payloadTypes.boardCreated, handleBoardCreation);
    };
  }, []);
  return (
    <Button variant="contained" disableElevation={true} onClick={handleClick}>
      Create Game
    </Button>
  );
};
