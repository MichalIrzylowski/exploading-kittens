import React, { useState } from 'react';

import { LayoutWrapper } from '@front/components/layout-wrapper';
import { BoardCreator } from './board-creator';

export const Game: React.FC = () => {
  const [isBoard, setBoard] = useState('');
  return (
    <LayoutWrapper>
      {!isBoard && <BoardCreator setNewBoard={setBoard} />}
    </LayoutWrapper>
  );
};
