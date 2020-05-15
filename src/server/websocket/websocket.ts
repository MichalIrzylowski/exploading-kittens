import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';

import { Board } from '@server/classes/board';
import { Player } from '@server/classes/player';

import { payloadTypes } from '@shared/payload-types';
import { customEvents } from '@shared/events';
import { createMessage } from '@shared/helpers/create-message';

const boards = new Map<string, Board>();
const players = new Map<string, Player>();

const fakeBoards = [uuid(), uuid(), uuid()];

fakeBoards.forEach((board) => {
  boards.set(board, new Board(board));
});

export const connection = (socket: WebSocket) => {
  socket.send(
    createMessage(payloadTypes.currentBoards, {
      boards: Array.from(boards.keys()),
    })
  );

  socket.on('message', (data) => {
    const message = JSON.parse(data as any);

    switch (message.type) {
      case payloadTypes.refreshBoards:
        socket.send(
          createMessage(payloadTypes.currentBoards, {
            boards: Array.from(boards.keys()),
          })
        );
        break;

      default:
        throw new Error(`Unhandled message: ${message.type}`);
    }
  });
};
