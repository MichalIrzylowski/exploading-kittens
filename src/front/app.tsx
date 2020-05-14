import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { WebsocketProvider, useWebsocket } from '@front/contexts/websocket';
import { payloadTypes } from '@shared/payload-types';

import { PageMenu } from '@front/components/page-menu';
import { Head } from '@front/components/head';

import './main.scss';

export const App: React.FC = () => {
  const ws = useWebsocket();

  const handleClick = () => ws.send(payloadTypes.registerUser, {});

  return (
    <BrowserRouter>
      <WebsocketProvider>
        <Head>
          <title>Exploading kittends</title>
        </Head>
        <PageMenu />
        <p>Hello</p>
        <button onClick={handleClick}>send message</button>
      </WebsocketProvider>
    </BrowserRouter>
  );
};
