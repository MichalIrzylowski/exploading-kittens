import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { List } from '@front/components/list';
import { ListItem } from '@front/components/list-item';

import { TBoard } from '@shared/types';
import { board } from '@shared/urls';

import css from './games-list.scss';

interface IGamesList {
  games: TBoard[];
}

interface IGameLink extends LinkProps {
  active: boolean;
}

const maxPlayers = 5;

const GameLink: React.FC<IGameLink> = ({ active, ...restProps }) =>
  active ? <Link {...restProps} /> : <p>Max players</p>;

export const GamesList: React.FC<IGamesList> = ({ games }) => (
  <List type="ul">
    {games.map(({ id, name, players }) => (
      <ListItem key={id} className={css.listItem}>
        <span>{name}</span>
        <span>
          {players} / {maxPlayers}
        </span>
        <GameLink
          active={players !== maxPlayers}
          to={{ pathname: board, state: id }}
        >
          Dołącz
        </GameLink>
      </ListItem>
    ))}
  </List>
);
