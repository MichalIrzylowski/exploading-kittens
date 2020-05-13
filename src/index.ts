import 'module-alias/register';
import '../config/env';
import http from 'http';
import path from 'path';

import express from 'express';
import WebSocket from 'ws';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

import { connection } from '@server/websocket';

const app = express();
const server = http.createServer(app);

const PORT = 3000;

const wss = new WebSocket.Server({ server });

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

  // compiler.run((err, stats) => {
  //   if (err) console.error(err);
  //   stats.toJson('minimal');
  // });
  compiler.watch(
    {
      aggregateTimeout: 1000,
      poll: undefined,
    },
    (err, stats) => {
      if (err) console.error(err);
      stats.toJson('minimal');
    }
  );
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/');

wss.on('connection', connection);

server.listen(PORT, () => {
  console.log(`waiting for playing on: http://localhost:${PORT}`);
});
