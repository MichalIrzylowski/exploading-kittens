import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { LayoutWrapper } from '@front/components/layout-wrapper';
import { BoardCreator } from './board-creator';

export const Game: React.FC = () => {
  const location = useLocation();
  const [isBoard, setBoard] = useState(location.state ? location.state : '');

  return (
    <LayoutWrapper>
      {!isBoard && <BoardCreator setNewBoard={setBoard} />}
    </LayoutWrapper>
  );
};
