import 'module-alias/register';
import '../config/env';
import http from 'http';
import path from 'path';
import url from 'url';

import express from 'express';
import WebSocket from 'ws';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { mainConnection } from '@server/websocket';
import { gameConnection } from '@server/websocket';

import { homePage, board } from '@shared/urls';

import webpackConfig from '../webpack.config';

const app = express();
const server = http.createServer(app);

const PORT = 3000;

const wss = new WebSocket.Server({ noServer: true }); // main ws connection
const wssGame = new WebSocket.Server({ noServer: true });

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack({
    mode: 'development',
    devtool: 'inline-source-map',
    ...webpackConfig,
  });

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    })
  );
} else if (process.env.NODE_ENV === 'production') {
  const compiler = webpack({
    mode: 'production',
    ...webpackConfig,
  });

  compiler.run((err, stats) => {
    console.log('bundle  build');
  });
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get(homePage);

server.on('upgrade', (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;

  if (pathname === homePage) {
    wss.handleUpgrade(request, socket, head, mainConnection);
  } else if (pathname === board) {
    wssGame.handleUpgrade(request, socket, head, gameConnection);
  } else {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  console.log(`waiting for playing on: http://localhost:${PORT}`);
});
