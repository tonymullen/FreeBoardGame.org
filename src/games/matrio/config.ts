import { IGameConfig } from '../index';
import { MatrioGame } from './game';
import { Board as MatrioBoard } from './Board';

const config: IGameConfig = {
  bgioGame: MatrioGame,
  bgioBoard: MatrioBoard,
  debug: true,
};

export default config;
