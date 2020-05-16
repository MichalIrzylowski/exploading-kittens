import React, { useState, useEffect } from 'react';

import { BoardWebsocketProvider } from '@front/contexts/board-websocket';

import { LayoutWrapper } from '@front/components/layout-wrapper';
import { Button, buttonAppearance } from '@front/components/button';
import { useBoardWebsocket } from '@front/contexts/board-websocket';

import { localStorageItems } from '@front/shared/types';

import { payloadTypes } from '@shared/payload-types';
import { customEvents } from '@shared/events';

export const Board = () => {
  const [isNewBoard, setIsNewBoard] = useState('');
  const ws = useBoardWebsocket();

  const handleClick = () => {
    const player = localStorage.getItem(localStorageItems.user);
    if (player) {
      ws.send(payloadTypes.createBoard, player);
    } else {
      ws.emit(customEvents.userNotRegistered);
    }
  };

  const handleBoardCreation = (id: string) => {
    setIsNewBoard(id);
  };

  useEffect(() => {
    ws.on(payloadTypes.boardCreated, handleBoardCreation);
  }, []);

  return (
    <BoardWebsocketProvider>
      <main>
        <LayoutWrapper>
          <Button appearance={buttonAppearance.primary} onClick={handleClick}>
            Create Game
          </Button>
        </LayoutWrapper>
      </main>
    </BoardWebsocketProvider>
  );
};
