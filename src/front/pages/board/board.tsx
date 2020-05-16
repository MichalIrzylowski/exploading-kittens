import React from 'react';

import { BoardWebsocketProvider } from '@front/contexts/board-websocket';

import { Game } from './game';

export const Board = () => (
  <BoardWebsocketProvider>
    <main>
      <Game />
    </main>
  </BoardWebsocketProvider>
);
