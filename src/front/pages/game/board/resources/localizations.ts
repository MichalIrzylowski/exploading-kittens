import { TranslationToken } from '@front/utils/translate';

export const boardCreatedSnack: TranslationToken = {
  'en-US': 'You have created new game!',
  'pl-PL': 'Stworzyłeś nową grę!',
};

export const playerLeftBoardSnack: TranslationToken = {
  'en-US': 'Player left the game',
  'pl-PL': 'Gracz opuścił grę',
};

export const playerJoinedBoard: TranslationToken = {
  'en-US': 'New player joined the game',
  'pl-PL': 'Nowy gracz dołączył do gry',
};

export const joinedBoardSnack: TranslationToken = {
  'en-US': 'You have entered the game',
  'pl-PL': 'Dołączyłeś do gry',
};

export const notAbleToStart: TranslationToken = {
  'en-US': 'There is not enough players to start!',
  'pl-PL': 'Nie ma wystarczającej ilości graczy aby zacząć!',
};

export const readyToStart: TranslationToken = {
  'en-US': 'Game is ready to start!',
  'pl-PL': 'Gra gotowa do rozpoczęcia!',
};

export const gameStartedSnack: TranslationToken = {
  'en-US': 'Game started!',
  'pl-PL': 'Gra rozpoczęta!',
};

export const started: TranslationToken = {
  ...gameStartedSnack,
};

export const startGame: TranslationToken = {
  'en-US': 'Start game!',
  'pl-PL': 'Rozpocznij grę!',
};
