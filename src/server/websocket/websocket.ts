import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';

import { Board } from '@server/classes/board';
import { Player } from '@server/classes/player';

import { payloadTypes } from '@shared/payload-types';
import { customEvents } from '@shared/events';
import { createMessage } from '@shared/helpers/create-message';

export const boards = new Map<string, Board>();
export const players = new Map<string, Player>();

const fakeBoards = [uuid(), uuid(), uuid()];

fakeBoards.forEach((boardId) => {
  boards.set(boardId, new Board(boardId));
});

const fakeNames = ['Marian', 'Zenek', 'Miłosz', 'Tobiasz', 'Borys'];

export const connection = (socket: WebSocket) => {
  socket.send(
    createMessage(payloadTypes.currentBoards, {
      boards: Array.from(boards.keys()),
    })
  );

  socket.on('message', (data) => {
    const message = JSON.parse(data as any);

    switch (message.type) {
      case payloadTypes.registerUser:
        let id = uuid();
        let randomNumber = Math.floor(Math.random() * fakeNames.length);
        if (randomNumber < 1) {
          randomNumber = 1;
        }
        const name = fakeNames[randomNumber];

        if (message.payload) {
          id = message.payload.id;
        }

        const playerId = { id: message.payload.id, name };

        players.set(id, new Player(playerId, socket));
        break;

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
