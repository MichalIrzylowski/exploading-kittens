import React from 'react';

import { List } from '@front/components/list';

interface IGamesList {
  games: TBoard[];
}

export const GamesList: React.FC<IGamesList> = ({ games }) => (
  <List type="ul">
    {games.map(({ id, players }) => (
      <li key={id}>
        {id}
        {players}
      </li>
    ))}
  </List>
);
