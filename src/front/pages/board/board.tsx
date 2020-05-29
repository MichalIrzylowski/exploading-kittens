import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useWebSocket } from '@front/contexts/main-websocket';
import { sessionStorageItems } from '@front/shared/types';
import { LayoutWrapper } from '@front/components/layout-wrapper';

import { payloadTypes } from '@shared/payload-types';

import { BoardCreator } from './board-creator';
import { PlayerView } from './player-view';

export const Board = () => {
  const history = useHistory();
  const [isBoard, setBoard] = useState(history.location.state ? history.location.state : '');
  const ws = useWebSocket();

  useEffect(() => {
    if (history.location.state) {
      const playerId = sessionStorage.getItem(sessionStorageItems.user) as string;
      ws.send(payloadTypes.joinGame, {
        boardId: history.location.state,
        userId: JSON.parse(playerId).id,
      });
    }

    const handleLeaveGame = () => {
      const boardId = sessionStorage.getItem(sessionStorageItems.currentGame);

      if (boardId) {
        const player = sessionStorage.getItem(sessionStorageItems.user) as string;
        const playerId = JSON.parse(player).id;
        ws.send(payloadTypes.leaveGame, { playerId, boardId });

        sessionStorage.removeItem(sessionStorageItems.currentGame);
      }
    };
    window.addEventListener('beforeunload', handleLeaveGame);

    return () => {
      handleLeaveGame();
      window.removeEventListener('beforeunload', handleLeaveGame);
    };
  }, [history.location.pathname]);

  return (
    <main>
      <LayoutWrapper>
        {!isBoard && <BoardCreator setNewBoard={setBoard} />}
        {isBoard && <PlayerView />}
      </LayoutWrapper>
    </main>
  );
};
