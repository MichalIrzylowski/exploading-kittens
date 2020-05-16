import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { MainWebsocketProvider } from '@front/contexts/main-websocket';

import { Head } from '@front/components/head';
import { TopBar } from '@front/components/top-bar';

import { MainPage } from '@front/pages/main-page';
import { Guide } from '@front/pages/guide';

import { homePage, guide } from '@shared/urls';

import './main.scss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainWebsocketProvider>
        <Head>
          <title>Exploding kittens</title>
        </Head>
        <TopBar />
        <Switch>
          <Route exact path={homePage} component={MainPage} />
          <Route exact path={guide} component={Guide} />
        </Switch>
      </MainWebsocketProvider>
    </BrowserRouter>
  );
};
