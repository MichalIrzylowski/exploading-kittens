import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { WebSocketProvider } from '@front/contexts/main-websocket';

import { Head } from '@front/components/head';
import { TopBar } from '@front/components/top-bar';

import { MainPage } from '@front/pages/main-page';
import { Guide } from '@front/pages/guide';
import { Board } from '@front/pages/board';

import { homePage, guide, board } from '@shared/urls';

import './main.scss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <WebSocketProvider>
        <Head>
          <title>Exploding kittens</title>
        </Head>
        <TopBar />
        <Switch>
          <Route exact path={homePage} component={MainPage} />
          <Route exact path={guide} component={Guide} />
          <Route exact path={board} component={Board} />
        </Switch>
      </WebSocketProvider>
    </BrowserRouter>
  );
};
