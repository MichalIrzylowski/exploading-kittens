import React, { useState } from 'react';

import { BoardWebsocketProvider } from '@front/contexts/board-websocket';

import { LayoutWrapper } from '@front/components/layout-wrapper';

import { BoardCreator } from './board-creator';

export const Board = () => {
  const [isBoard, setBoard] = useState('');

  return (
    <BoardWebsocketProvider>
      <main>
        <LayoutWrapper>
          {!isBoard && <BoardCreator setNewBoard={setBoard} />}
        </LayoutWrapper>
      </main>
    </BoardWebsocketProvider>
  );
};
