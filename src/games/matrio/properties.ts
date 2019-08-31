import { IGameCtx } from '@freeboardgame.org/boardgame.io/core';
import { IGameArgs } from '../../App/Game/GameBoardWrapper';
import { IG } from './game';
import Card from '../takesix/card';

export interface IBoardProps {
  G: IG;
  ctx: IGameCtx;
  moves: any;
  step: any;
  playerID: string;
  gameArgs?: IGameArgs;
  cards: Card[];
}
