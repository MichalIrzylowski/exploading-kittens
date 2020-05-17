import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { useBoardWebsocket } from '@front/contexts/board-websocket';
import { LayoutWrapper } from '@front/components/layout-wrapper';
import { sessionStorageItems } from '@front/shared/types';
import { payloadTypes } from '@shared/payload-types';
import { customEvents } from '@shared/events';

import { BoardPlay } from './board-play';
import { BoardCreator } from './board-creator';

export const Game: React.FC = () => {
  const location = useLocation();
  const [isBoard, setBoard] = useState(location.state ? location.state : '');
  const ws = useBoardWebsocket();

  const handleJoinGame = () => {
    if (location.state) {
      const playerId = sessionStorage.getItem(
        sessionStorageItems.user
      ) as string;
      ws.send(payloadTypes.joinGame, {
        boardId: location.state,
        userId: JSON.parse(playerId).id,
      });
    }
  };

  useEffect(() => {
    ws.on(customEvents.open, handleJoinGame);
    return () => {
      ws.off(customEvents.open, handleJoinGame);
    };
  });

  return (
    <LayoutWrapper>
      {!isBoard && <BoardCreator setNewBoard={setBoard} />}
      {isBoard && <BoardPlay />}
    </LayoutWrapper>
  );
};
