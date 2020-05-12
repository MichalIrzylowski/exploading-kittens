import http from 'http';

import express from 'express';
import WebSocket from 'ws';

import { connection, message } from './shared/events';

const app = express();
const server = http.createServer(app);

const PORT = 3000;

const wss = new WebSocket.Server({ server });

wss.on(connection, (socket) => {
  console.log('elo2');

  socket.on(message, (data) => {
    console.log(data);

    socket.send(`Recieved: ${data}`);
  });

  socket.send('Hello I am server');
});

server.listen(PORT, () => {
  console.log('elo');
});
