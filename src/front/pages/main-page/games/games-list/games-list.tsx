import React from 'react';
import { Link } from 'react-router-dom';

import { List } from '@front/components/list';
import { ListItem } from '@front/components/list-item';

import { TBoard } from '@shared/types';
import { board } from '@shared/urls';

import css from './games-list.scss';

interface IGamesList {
  games: TBoard[];
}

const maxPlayers = 5;

export const GamesList: React.FC<IGamesList> = ({ games }) => (
  <List type="ul">
    {games.map(({ id, name, players }) => (
      <ListItem key={id} className={css.listItem}>
        <span>{name}</span>
        <span>
          {players} / {maxPlayers}
        </span>
        <Link to={board + '/' + id}>Dołącz</Link>
      </ListItem>
    ))}
  </List>
);
