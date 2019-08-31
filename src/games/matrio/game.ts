import { Game, IGameCtx } from '@freeboardgame.org/boardgame.io/core';
import { Card } from './shared/Card';
import { Dot } from './shared/Dot';
import { DealerService } from './services/DealerService';
import { c } from 'ttag/types';

export interface IG {
  count: number;
  dots: Dot[][];
  leftMatrix: Card[][];
  topMatrix: Card[][];
  playerCards: Card[][];
  prodMatrix: number[];
}

const dealer: DealerService = new DealerService();

export const MatrioGame = Game({
  name: 'matrio',
  setup: ctx => {
    ctx.numPlayers = 4;
    return {
      dots: dots,
      leftMatrix: leftMatrix,
      topMatrix: topMatrix,
      prodMatrix: Array(9).fill(null),
      playerCards: playerCards,
      count: 0,
    };
  },
  moves: {
    placeCard(G: IG, ctx: IGameCtx, cardname: string, row: number, col: number, matrix: 'leftMatrix' | 'topMatrix') {
      const player = parseInt(ctx.playerID, 10);
      G.playerCards[player] = G.playerCards[player].filter((i: Card) => {
        return i.name !== cardname;
      });
      console.log('cards after');

      console.log(G.playerCards[Number(ctx.currentPlayer)]);
      console.log(G.count);

      G[matrix][col][row] = name_card[cardname];

      updateDots(G, ctx.currentPlayer);
      return {
        playerCards: G.playerCards,
        count: G.count + 1,
      };
    },
  },
  flow: {
    endGameIf: G => {
      if (G.count === 10) {
        return { winner: '1' };
      }
    },
    movesPerTurn: 1,
  },
});

const leftMatrix = [
  [new Card('spade', 'blank'), new Card('spade', 'blank'), new Card('spade', 'blank')],
  [new Card('diamond', 'blank'), new Card('diamond', 'blank'), new Card('diamond', 'blank')],
  [new Card('club', 'blank'), new Card('club', 'blank'), new Card('club', 'blank')],
  [new Card('heart', 'blank'), new Card('heart', 'blank'), new Card('heart', 'blank')],
];

const topMatrix = [
  [new Card('spade', 'blank'), new Card('spade', 'blank'), new Card('spade', 'blank')],
  [new Card('diamond', 'blank'), new Card('diamond', 'blank'), new Card('diamond', 'blank')],
  [new Card('club', 'blank'), new Card('club', 'blank'), new Card('club', 'blank')],
  [new Card('heart', 'blank'), new Card('heart', 'blank'), new Card('heart', 'blank')],
];

const dots = [
  [new Dot('nobody', null), new Dot('nobody', null), new Dot('nobody', null)],
  [new Dot('nobody', null), new Dot('nobody', null), new Dot('nobody', null)],
  [new Dot('nobody', null), new Dot('nobody', null), new Dot('nobody', null)],
];

const name_card: { [s: string]: Card } = {};
dealer.deck.forEach(card => {
  name_card[card.name] = card;
});

const playerCards = [
  dealer.deck.slice(0, 13),
  dealer.deck.slice(13, 26),
  dealer.deck.slice(26, 39),
  dealer.deck.slice(39, 52),
];

function updateDots(G: IG, player: string) {
  let leftColumn = 0;
  let leftRow = 0;
  let topColumn = 0;
  let topRow = 0;
  for (leftRow = 0; leftRow < 3; leftRow++) {
    let filledrows = true;
    for (leftColumn = 0; leftColumn < 3; leftColumn++) {
      if (G.leftMatrix[leftColumn][leftRow].face === 'blank') {
        filledrows = false;
      }
    }
    if (filledrows) {
      for (topColumn = 0; topColumn < 3; topColumn++) {
        let filledcolumns = true;
        for (topRow = 0; topRow < 4; topRow++) {
          console.log(G.leftMatrix[topRow][topColumn].face);
          if (G.topMatrix[topRow][topColumn].face === 'blank') {
            filledcolumns = false;
          }
        }
        if (filledcolumns) {
          if (G.dots[leftRow][topColumn].player === 'nobody') {
            G.dots[leftRow][topColumn] = new Dot(player, getDotProduct(G, leftRow, topColumn));
          } else {
            G.dots[leftRow][topColumn].score = getDotProduct(G, leftRow, topColumn);
          }
        }
      }
    }
  }
}

function getDotProduct(G: IG, leftRow: number, topColumn: number) {
  let dp = 0;
  for (let i = 0; i < 4; i++) {
    dp += G.leftMatrix[i][leftRow].value * G.topMatrix[i][topColumn].value;
  }
  return dp;
}
