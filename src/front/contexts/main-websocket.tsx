import React, { useContext } from 'react';

import { ReconnectingWebsocket } from '@front/classes/reconnecting-websocket';

import { mainSocketRoute } from '@shared/urls';

const ws = new ReconnectingWebsocket(mainSocketRoute);
ws._connect();

const WebsocketContext = React.createContext(ws);

export const MainWebsocketProvider: React.FC = (props) => {
  return <WebsocketContext.Provider value={ws} {...props} />;
};

export const useMainWebsocket = () => {
  const value = useContext(WebsocketContext);

  if (!value) {
    throw new Error(
      'useWebsocket hook has to be used inside MainWebsocketProvider'
    );
  }

  return value;
};
