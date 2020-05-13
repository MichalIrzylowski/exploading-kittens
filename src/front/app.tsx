import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { WebsocketProvider, useWebsocket } from '@front/contexts/websocket';
import { payloadTypes } from '@shared/payload-types';

import { Menu } from '@front/components/menu';

import './main.scss';

export const App: React.FC = () => {
  const ws = useWebsocket();

  const handleClick = () => ws.send(payloadTypes.registerUser, {});

  return (
    <BrowserRouter>
      <WebsocketProvider>
        <Menu />
        <div>Hello</div>
        <button onClick={handleClick}>send message</button>
      </WebsocketProvider>
    </BrowserRouter>
  );
};
