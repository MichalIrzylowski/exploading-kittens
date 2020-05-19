export enum payloadTypes {
  boardCreated = 'board-created',
  boardCreatedSnackSuccess = 'boardCreatedSnack-success',
  boardDeleted = 'board-deleted',
  createBoard = 'create-board',
  currentBoards = 'current-boards',

  error = 'error',
  errorGameHasAlreadyStarted = 'error-game-has-already-started',
  errorTooManyPlayers = 'too-many-players',

  gameNotAbleToStart = 'notAbleToStart',
  gameReadyToStart = 'readyToStart',
  gameStarted = 'started',
  startGame = 'start-game',
  gameStartedSnackSuccess = 'gameStartedSnack-success',

  joinedBoardSnackSuccess = 'joinedBoardSnack-success',
  joinGame = 'join-game',
  leaveGame = 'leave-game',
  newPlayer = 'new-player',
  playerJoinedSnackSuccess = 'playerJoinedSnack-success',
  playerLeftBoard = 'player-left-board',
  playerLeftBoardSnackInfo = 'playerLeftBoardSnack-info',

  refreshBoards = 'refresh-boards',
  registerUser = 'register-user',
}
