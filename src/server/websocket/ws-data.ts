import { Board } from '@server/classes/board';
import { Player } from '@server/classes/player';

export const boards = new Map<string, Board>();
export const players = new Map<string, Player>();
