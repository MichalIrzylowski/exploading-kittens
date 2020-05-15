import React from 'react';
import { Link } from 'react-router-dom';

import { List } from '@front/components/list';
import { ListItem } from '@front/components/list-item';

import { TBoard } from '@shared/types';
import { game } from '@shared/endpoints';

import css from './games-list.scss';

interface IGamesList {
  games: TBoard[];
}

const maxPlayers = 5;

export const GamesList: React.FC<IGamesList> = ({ games }) => (
  <List type="ul" className={css.listItem}>
    {games.map(({ id, name, players }) => (
      <ListItem key={id}>
        <span>{name}</span>
        <span>
          {players} / {maxPlayers}
        </span>
        <Link to={game + id}>Dołącz</Link>
      </ListItem>
    ))}
  </List>
);
