import React, { useContext } from 'react';

import { ReconnectingWebsocket } from '@front/classes/reconnecting-websocket';

const socketURL = 'ws://localhost:3000';
const ws = new ReconnectingWebsocket(socketURL);
ws._connect();

const WebsocketContext = React.createContext(ws);

export const WebsocketProvider: React.FC = (props) => {
  return <WebsocketContext.Provider value={ws} {...props} />;
};

export const useWebsocket = () => {
  const value = useContext(WebsocketContext);

  if (!value) {
    throw new Error(
      'useWebsocket hook has to be used inside WebsocketProvider'
    );
  }

  return value;
};
