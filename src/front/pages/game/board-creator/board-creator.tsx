import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { useWebSocket } from '@front/contexts/main-websocket';
import { sessionStorageItems } from '@front/shared/types';

import { customEvents } from '@shared/events';
import { payloadTypes } from '@shared/payload-types';
import { game } from '@shared/urls';

export const BoardCreator: React.FC = () => {
  const ws = useWebSocket();
  const history = useHistory();

  const handleClick = () => {
    const player = sessionStorage.getItem(sessionStorageItems.user);
    if (player) {
      ws.send(payloadTypes.createBoard, JSON.parse(player));
    } else {
      ws.emit(customEvents.userNotRegistered);
    }
  };

  const handleBoardCreation = (id: string) => {
    sessionStorage.setItem(sessionStorageItems.currentGame, id);
    history.push(`${game}/${id}`);
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
