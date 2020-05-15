import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { WebsocketProvider } from '@front/contexts/websocket';
import { PageMenu } from '@front/components/page-menu';
import { Head } from '@front/components/head';
import { MainPage } from '@front/pages/main-page';

import { useWebsocket } from '@front/contexts/websocket';
import { payloadTypes } from '@shared/payload-types';

import './main.scss';

export const App: React.FC = () => {
  const elo = useWebsocket();

  const handleClick = () => {
    elo.send(payloadTypes.createGame);
  };
  return (
    <BrowserRouter>
      <WebsocketProvider>
        <Head>
          <title>Exploding kittens</title>
        </Head>
        <PageMenu />
        <MainPage />
        <button onClick={handleClick}>zrób grę</button>
      </WebsocketProvider>
    </BrowserRouter>
  );
};
