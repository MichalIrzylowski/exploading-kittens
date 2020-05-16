import React from 'react';

import { BoardWebsocketProvider } from '@front/contexts/game-websocket';

import { LayoutWrapper } from '@front/components/layout-wrapper';

export const Board = () => {
  return (
    <BoardWebsocketProvider>
      <main>
        <LayoutWrapper>Board</LayoutWrapper>
      </main>
    </BoardWebsocketProvider>
  );
};
