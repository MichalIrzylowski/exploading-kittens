import EventEmitter from 'eventemitter3';
import { createMessage } from '@shared/helpers/create-message';
import { payloadTypes } from '@shared/payload-types';
import { customEvents } from '@shared/events';

import { localStorageItems } from '@front/shared/types';

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

    this.on(payloadTypes.registerUser, (data) => {
      localStorage.setItem(localStorageItems.user, JSON.stringify(data));
    });
  }

  _connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', this.onOpenConnection);
    this.socket.addEventListener('close', this.reconnect);
    this.socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);

      console.log('ReconnectingWebsocket._connect', data);

      this.emit(message.type, message.payload);
    });
  }

  onOpenConnection = () => {
    this.emit(customEvents.open);

    let user = localStorage.getItem(localStorageItems.user);
    if (user) user = JSON.parse(user);
    this.send(payloadTypes.registerUser, user);

    console.log('connected');
  };

  reconnect = () => {
    this.emit(customEvents.close);
    timeout = setTimeout(() => {
      this._connect();
    }, second);
  };

  send = (type: payloadTypes, payload?: any) => {
    this.socket?.send(createMessage(type, payload));
  };

  socket?: WebSocket;
  url: string;
}
