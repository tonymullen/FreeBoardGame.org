import { Game } from '@freeboardgame.org/boardgame.io/core';

export interface IG {
  count: number;
}

export const MatrioGame = Game({
  name: 'matrio',

  setup: () => ({ count: 0 }),

  moves: {
    plusone(G: IG) {
      return { count: G.count + 1 };
    },
  },

  flow: {
    movesPerTurn: 1,
  },
});
