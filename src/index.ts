import 'module-alias/register';
import http from 'http';
import path from 'path';

import express from 'express';
import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';

import { Board } from '@server/classes/board';

import { connection, message } from '@shared/events';
import { createBoard } from '@shared/payload-types';

const app = express();
const server = http.createServer(app);

const PORT = 3000;

const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/');

const boards = new Map();

wss.on(connection, (socket) => {
  socket.on(message, (data) => {
    const payload = JSON.parse(data as any);

    if (payload.type === createBoard) {
      const boardId = uuid();
      boards.set(boardId, new Board());
    }

    console.log(payload);
  });

  socket.send(JSON.stringify({ id: uuid() }));
});

server.listen(PORT, () => {
  console.log(`waiting for playing on: http://localhost:${PORT}`);
});
