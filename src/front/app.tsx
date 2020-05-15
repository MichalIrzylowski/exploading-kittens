import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { WebsocketProvider } from '@front/contexts/websocket';
import { PageMenu } from '@front/components/page-menu';
import { Head } from '@front/components/head';
import { MainPage } from '@front/pages/main-page';

import './main.scss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <WebsocketProvider>
        <Head>
          <title>Exploding kittens</title>
        </Head>
        <PageMenu />
        <MainPage />
      </WebsocketProvider>
    </BrowserRouter>
  );
};
