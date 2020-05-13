import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';

import { Board } from '@server/classes/board';

import { payloadTypes } from '@shared/payload-types';

const boards = new Map();

export const connection = (socket: WebSocket) => {
  socket.on('message', (data) => {
    const payload = JSON.parse(data as any);

    if (payload.type === payloadTypes.createBoard) {
      const boardId = uuid();
      console.log(new Board(boardId));
      socket.send(JSON.stringify({ type: 'hello' }));
    }
  });

  socket.send(JSON.stringify({ id: uuid() }));
};
