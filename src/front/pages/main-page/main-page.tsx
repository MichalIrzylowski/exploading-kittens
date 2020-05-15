import React from 'react';

import { LayoutWrapper } from '@front/components/layout-wrapper';
import { useWebsocket } from '@front/contexts/websocket';
import { Paper } from '@front/components/paper';

export const MainPage = () => {
  const ws = useWebsocket();

  ws.on('open', () => {
    console.log('Hello connection is open');
  });
  return (
    <main>
      <LayoutWrapper>
        <header>
          <h1>Exploading kittens</h1>
          <h2>
            A card game
            <br />
            for people who are into
            <br />
            kittens and explosions
            <br /> and laster beams
            <br /> and sometimes goats
          </h2>
        </header>
        <Paper>Paper here</Paper>
      </LayoutWrapper>
    </main>
  );
};
