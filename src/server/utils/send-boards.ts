import ws from 'ws';

import { createMessage } from '@shared/helpers/create-message';
import { payloadTypes } from '@shared/payload-types';

import { Board } from '@server/classes/board';

type TBoard = { id: string; players: number };

export const sendBoards = (socket: ws, boardsMap: Map<string, Board>) => {
  const boards: TBoard[] = [];

  boardsMap.forEach((board, boardId) => {
    boards.push({ id: boardId, players: board.players.length });
  });

  socket.send(createMessage(payloadTypes.currentBoards, boards));
};
