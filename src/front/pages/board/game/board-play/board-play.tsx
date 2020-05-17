import React, { useState, useEffect } from 'react';

import {
  SnackBarGroup,
  SnackbarMessage,
} from '@front/components/snack-bar-group';

import { useBoardWebsocket } from '@front/contexts/board-websocket';
import { useMainWebsocket } from '@front/contexts/main-websocket';

import { payloadTypes } from '@shared/payload-types';
import { sessionStorageItems } from '@front/shared/types';

import { snackMessageCreator } from './helpers/message-creator';

export const BoardPlay: React.FC = () => {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const gameWS = useBoardWebsocket();
  const mainWS = useMainWebsocket();

  const handleAddMessage = (data: any) => {
    const newMessage = snackMessageCreator(data.message, data.severity);
    setSnackPack((prevValue) => [...prevValue, newMessage]);
  };
  const handleJoinBoardMessage = ({ boardId, ...restData }: any) => {
    sessionStorage.setItem(sessionStorageItems.currentGame, boardId);
    handleAddMessage(restData);
  };
  gameWS.on(payloadTypes.boardCreatedSnackSuccess, handleAddMessage);
  gameWS.on(payloadTypes.playerLeftBoardSnackInfo, handleAddMessage);
  gameWS.on(payloadTypes.newPlayerSnackSuccess, handleAddMessage);
  mainWS.on(payloadTypes.joinedBoardSnackSuccess, handleJoinBoardMessage);

  return (
    <div>
      Game will be here
      <SnackBarGroup snackPack={snackPack} setSnackPack={setSnackPack} />
    </div>
  );
};
