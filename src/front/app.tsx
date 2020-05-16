import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { MainWebsocketProvider } from '@front/contexts/main-websocket';
import { TopBar } from '@front/components/top-bar';
import { Head } from '@front/components/head';
import { MainPage } from '@front/pages/main-page';

import { useMainWebsocket } from '@front/contexts/main-websocket';
import { payloadTypes } from '@shared/payload-types';

import './main.scss';

export const App: React.FC = () => {
  const elo = useMainWebsocket();

  const handleClick = () => {
    elo.send(payloadTypes.createGame);
  };
  return (
    <BrowserRouter>
      <MainWebsocketProvider>
        <Head>
          <title>Exploding kittens</title>
        </Head>
        <TopBar />
        <MainPage />
        <button onClick={handleClick}>zrób grę</button>
      </MainWebsocketProvider>
    </BrowserRouter>
  );
};
