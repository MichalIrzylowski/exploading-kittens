import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useWebSocket } from '@front/contexts/main-websocket';
import { sessionStorageItems } from '@front/shared/types';
import { LayoutWrapper } from '@front/components/layout-wrapper';

import { payloadTypes } from '@shared/payload-types';

import { BoardCreator } from './board-creator';
import { PlayerView } from './player-view';

export const Board = () => {
  const location = useLocation();
  console.log(location.state);
  const [isBoard, setBoard] = useState(location.state ? location.state : '');
  const ws = useWebSocket();

  useEffect(() => {
    if (location.state) {
      const playerId = sessionStorage.getItem(sessionStorageItems.user) as string;
      ws.send(payloadTypes.joinGame, {
        boardId: location.state,
        userId: JSON.parse(playerId).id,
      });
    }
  });
  return (
    <main>
      <LayoutWrapper>
        {!isBoard && <BoardCreator setNewBoard={setBoard} />}
        {isBoard && <PlayerView />}
      </LayoutWrapper>
    </main>
  );
};
