import { IGameCtx } from '@freeboardgame.org/boardgame.io/core';
import { IGameArgs } from '../../App/Game/GameBoardWrapper';
import { IG } from './game';
import { Card } from './shared/Card';
import { Dot } from './shared/Dot';

export interface IBoardProps {
  G: IG;
  ctx: IGameCtx;
  moves: any;
  step: any;
  events: any;
  gameArgs?: IGameArgs;
  cards: Card[];
}

export interface MatrixBoardProps {
  G: IG;
  ctx: IGameCtx;
  moves: any;
  step: any;
  events: any;
  gameArgs?: IGameArgs;
  cards: Card[];
  selectedCard: Card;
  dragging: boolean;
  setDraggingFalse: () => void;
}

export interface MatrixProps {
  G: IG;
  ctx: IGameCtx;
  moves: any;
  step: any;
  events: any;
  gameArgs?: IGameArgs;
  cards: Card[];
  selectedCard: Card;
  dragging: boolean;
  setDraggingFalse: () => void;
  mat: Card[][];
  left_or_top: 'leftMatrix' | 'topMatrix';
}

export interface IDotProps {
  G: IG;
  ctx: IGameCtx;
  moves: any;
  step: any;
  events: any;
  gameArgs?: IGameArgs;
  cards: Card[];
  dot: Dot;
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
  setSelectedCard: (card: Card) => void;
  setDraggingTrue: () => void;
  setDraggingFalse: () => void;
  playerID: number;
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
  setSelectedCard: (card: Card) => void;
  setDraggingTrue: () => void;
  setDraggingFalse: () => void;
}
