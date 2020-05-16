export const homePage = '/';
export const guide = '/guide';
export const board = '/game';
export const boardParams = board + '/:boardId';

export const mainSocketRoute = 'ws://localhost:3000';
export const boardSocketRoute = mainSocketRoute + board;