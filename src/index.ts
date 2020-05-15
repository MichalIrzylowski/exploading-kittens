import 'module-alias/register';
import '../config/env';
import http from 'http';
import path from 'path';

import express from 'express';
import WebSocket from 'ws';
import webpack, { Configuration } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { connection } from '@server/websocket';

import webpackConfig from '../webpack.config';

const app = express();
const server = http.createServer(app);

const PORT = 3000;

const wss = new WebSocket.Server({ server });

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig as Configuration);

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
  const compiler = webpack(webpackConfig as Configuration);

  compiler.run((err, stats) => {
    console.log('bundle  build');
  });
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/');

wss.on('connection', connection);

server.listen(PORT, () => {
  console.log(`waiting for playing on: http://localhost:${PORT}`);
});
