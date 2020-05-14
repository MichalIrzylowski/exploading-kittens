import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { WebsocketProvider, useWebsocket } from '@front/contexts/websocket';
import { PageMenu } from '@front/components/page-menu';
import { Head } from '@front/components/head';
import { MainPage } from '@front/pages/main-page';

import { payloadTypes } from '@shared/payload-types';

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
        <MainPage />
      </WebsocketProvider>
    </BrowserRouter>
  );
};
