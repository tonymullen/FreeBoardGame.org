import MatrioThumbnail from './media/thumbnail.png';
import { GameMode } from '../../App/Game/GameModePicker';
import { IGameDef } from '../../games';
import instructions from './instructions.md';

export const matrioGameDef: IGameDef = {
  code: 'matrio',
  name: 'MatriO',
  imageURL: MatrioThumbnail,
  minPlayers: 2,
  maxPlayers: 2,
  modes: [{ mode: GameMode.OnlineFriend }, { mode: GameMode.LocalFriend }],
  description: 'Mathy card game',
  descriptionTag: `A card and board game based on \
 matrix multiplication.`,
  instructions: {
    videoId: 'q0qpQ8doUp8',
    text: instructions,
  },
  config: () => import('./config'),
};
