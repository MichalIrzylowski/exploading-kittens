import EventEmitter from 'eventemitter3';
import { createMessage } from '@shared/helpers/create-message';
import { payloadTypes } from '@shared/payload-types';

interface IReconnectingWebsocket {
  url: string;
  socket?: WebSocket;
}

const second = 1000;
let timeout;

export class ReconnectingWebsocket extends EventEmitter
  implements IReconnectingWebsocket {
  constructor(url: string) {
    super();
    this.url = url;
    this.emit('close');
  }

  _connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', this.onOpenConnection);
    this.socket.addEventListener('close', this.reconnect);
  }

  onOpenConnection = () => {
    console.log('connect');
  };

  reconnect = () => {
    timeout = setTimeout(() => {
      console.log('reconnecting');

      this._connect();
    }, second);
  };

  send = (type: payloadTypes, payload: any) => {
    this.socket?.send(createMessage(type, payload));
  };

  addEventListener = (...args: any[]) => {
    this.addEventListener(args);
  };

  socket?: WebSocket;
  url: string;
}
