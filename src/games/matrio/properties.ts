import { IGameCtx } from '@freeboardgame.org/boardgame.io/core';
import { IGameArgs } from '../../App/Game/GameBoardWrapper';
import { IG } from './game';
import { Card } from './shared/Card';

export interface IBoardProps {
  G: IG;
  ctx: IGameCtx;
  moves: any;
  step: any;
  events: any;
  playerID: string;
  gameArgs?: IGameArgs;
  cards: Card[];
}

export interface ICardProps {
  G: IG;
  ctx: IGameCtx;
  isActive: boolean;
  card: Card;
  size: string;
  moves: any;
  events: any;
  step: any;
}

export interface IHandProps {
  G: IG;
  ctx: IGameCtx;
  isActive: boolean;
  cards: Card[];
  moves: any;
  events: any;
  step: any;
  playerID: number;
}
