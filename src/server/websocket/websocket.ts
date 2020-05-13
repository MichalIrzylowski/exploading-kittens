import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';

import { Board } from '@server/classes/board';
import { Player } from '@server/classes/player';

import { payloadTypes } from '@shared/payload-types';
import { customEvents } from '@shared/events';

const boards = new Map();
const players = new Map();

export const connection = (socket: WebSocket) => {
  socket.on('message', (data) => {
    const payload = JSON.parse(data as any);

    if (payload.type === payloadTypes.registerUser) {
      const playerId = uuid();
      players.set(
        playerId,
        new Player({ id: playerId, name: 'Zenek' }, socket)
      );

      Array.from(players.keys()).forEach((player) => {
        players.get(player).socket.send('hello');
      });
    }

    if (payload.type === payloadTypes.createBoard) {
      const boardId = uuid();

      boards.set(boardId, new Board(boardId));

      socket.emit(customEvents.boardCreated);
    }
  });
};
