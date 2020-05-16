import EventEmitter from 'eventemitter3';
import { createMessage } from '@shared/helpers/create-message';
import { payloadTypes } from '@shared/payload-types';
import { customEvents } from '@shared/events';

import { sessionStorageItems } from '@front/shared/types';

interface IReconnectingWebsocket {
  closeOnPurpose: boolean;
  socket?: WebSocket;
  url: string;
}

const second = 1000;
let timeout;

export class ReconnectingWebsocket extends EventEmitter
  implements IReconnectingWebsocket {
  constructor(url: string) {
    super();
    this.url = url;
    this.closeOnPurpose = false;

    this.on(payloadTypes.registerUser, (data) => {
      sessionStorage.setItem(sessionStorageItems.user, JSON.stringify(data));
    });
  }

  _connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', this.onOpenConnection);
    this.socket.addEventListener('close', this.reconnect);
    this.socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);

      console.log('ReconnectingWebsocket._connect', message);

      this.emit(message.type, message.payload);
    });
  }

  onOpenConnection = () => {
    this.emit(customEvents.open);

    let user = sessionStorage.getItem(sessionStorageItems.user);
    if (user) user = JSON.parse(user);
    this.send(payloadTypes.registerUser, user);

    console.log('connected');
  };

  reconnect = () => {
    this.emit(customEvents.close);
    timeout = setTimeout(() => {
      this._connect();
    }, second);

    if (this.closeOnPurpose) clearTimeout(timeout);
  };

  send = (type: payloadTypes, payload?: any) => {
    this.socket?.send(createMessage(type, payload));
  };

  close = () => {
    this.closeOnPurpose = true;
    this.socket?.close();
  };

  closeOnPurpose: boolean;
  socket?: WebSocket;
  url: string;
}
