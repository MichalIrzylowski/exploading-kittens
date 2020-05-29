export enum snackMessages {
  gameNotReadyToStart = 'gameNotReadyToStart',
  gameReadyToStart = 'gameReadyToStart',
  gameStarted = 'gameStarted',
  playerJoinedBoard = 'playerJoinedBoard',
  playerLeftBoard = 'playerLeftBoard',
  boardCreated = 'boardCreated',
}

export type TSnackSeverity = 'success' | 'info' | 'warning' | 'error';
