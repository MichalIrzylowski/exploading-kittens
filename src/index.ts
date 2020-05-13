import 'module-alias/register';
import http from 'http';
import path from 'path';

import express from 'express';
import WebSocket from 'ws';

import { connection } from '@server/websocket';

const app = express();
const server = http.createServer(app);

const PORT = 3000;

const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/');

wss.on('connection', connection);

server.listen(PORT, () => {
  console.log(`waiting for playing on: http://localhost:${PORT}`);
});
