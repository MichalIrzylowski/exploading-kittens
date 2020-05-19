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
      case payloadTypes.registerUser:
        const registeringPlayer = players.get(message.payload.id) as Player;
        registeringPlayer.sockets.game = socket;
        break;

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

        const snackData = payloadTypes.boardCreatedSnackSuccess.split('-');

        socket.send(createMessage(payloadTypes.boardCreated, boardId));
        socket.send(
          createMessage(payloadTypes.boardCreatedSnackSuccess, {
            message: snackData[0],
            severity: snackData[1],
          })
        );

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
        boards
          .get(message.payload.boardId)
          ?.removePlayer(message.payload.playerId);
        break;

      case payloadTypes.joinGame:
        const joiningPlayer = players.get(message.payload.userId) as Player;
        boards.get(message.payload.boardId)?.addPlayer(joiningPlayer);
        break;

      case payloadTypes.startGame:
        boards.get(message.payload)?.startGame();
        break;

      default:
        throw new Error(`Unhandled message (game websocket): ${message.type}`);
    }
  });
};
