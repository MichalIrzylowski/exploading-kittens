import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';

import { Board } from '@server/classes/board';
import { Player } from '@server/classes/player';

import { payloadTypes } from '@shared/payload-types';
import { createMessage } from '@shared/helpers/create-message';

import { broadCastToAllUsers } from '@server/utils/broad-cast-to-all-users';

import { boards, players } from './ws-data';

export const gameConnection = (socket: WebSocket) => {
  socket.on('message', (data) => {
    const message = JSON.parse(data as any);

    switch (message.type) {
      case payloadTypes.createBoard:
        const boardId = uuid();
        const { id } = message.payload;

        const player = players.get(id);
        if (!player) {
          socket.send(
            createMessage(payloadTypes.error, 'player not registered')
          );
          break;
        }

        player.isPlaying = boardId;
        boards.set(boardId, new Board(boardId, player));

        socket.send(createMessage(payloadTypes.boardCreated, boardId));

        broadCastToAllUsers(players, {
          type: payloadTypes.createBoard,
          payload: {
            id: boardId,
            players: boards.get(boardId)?.players.length,
            name: boardId,
          },
        });
        break;

      case payloadTypes.leaveGame:
        const { payload } = message;
        boards.get(payload.boardId)?.removePlayer(payload.playerId);
        break;

      case payloadTypes.registerUser:
        // when user is connecting his context sends register user due to the fact that is triggered on open connection
        // TODO: fix it better then it is now
        console.log('register user');
        break;

      default:
        throw new Error(`Unhandled message (game websocket): ${message.type}`);
    }
  });
};
