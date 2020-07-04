import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import { SnackBarProvider } from '@front/contexts/snack-bar-context';
import { WebSocketProvider } from '@front/contexts/main-websocket';

import { Head } from '@front/components/head';
import { TopBar } from '@front/components/top-bar';

import { MainPage } from '@front/pages/main-page';
import { Guide } from '@front/pages/guide';
import { Game } from '@front/pages/board';

import { homePage, guide, game } from '@shared/urls';

import './main.scss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SnackBarProvider>
        <WebSocketProvider>
          <Head>
            <title>Exploding kittens</title>
          </Head>
          <TopBar />
          <Route exact path={homePage} component={MainPage} />
          <Route path={guide} component={Guide} />
          <Route path={game} component={Game} />
        </WebSocketProvider>
      </SnackBarProvider>
    </BrowserRouter>
  );
};
