import React from 'react';

interface IGamesList {
  games: string[];
}

export const GamesList: React.FC<IGamesList> = ({ games }) => (
  <ul>
    {games.map((game) => (
      <li key={game}>{game}</li>
    ))}
  </ul>
);
