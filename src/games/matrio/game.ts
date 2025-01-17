import { Game, IGameCtx } from '@freeboardgame.org/boardgame.io/core';
import { Card } from './shared/Card';
import { Dot } from './shared/Dot';
import { DealerService } from './services/DealerService';

export interface IG {
  count: number;
  dots: Dot[][];
  leftMatrix: Card[][];
  topMatrix: Card[][];
  playerCards: Card[][];
  prodMatrix: number[];
  name_card: { [s: string]: Card };
  emptyTrays: { [suit: string]: number };
  playerScores: number[];
  bustPlayers: number[];
  winnner: number;
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
      name_card: name_card,
      count: 0,
      emptyTrays: emptyTrays,
      playerScores: playerScores,
      bustPlayers: [],
      winner: -1,
    };
  },
  moves: {
    placeCard(G: IG, ctx: IGameCtx, cardname: string, row: number, col: number, matrix: 'leftMatrix' | 'topMatrix') {
      console.log('Placing card');
      const player = parseInt(ctx.playerID, 10);
      const card = name_card[cardname];
      card.flip = false;
      const newPlayerCards = G.playerCards[player].filter((i: Card) => {
        return i.name !== cardname;
      });

      let newLeftMatrix = [...G.leftMatrix];
      let newTopMatrix = [...G.topMatrix];
      let newEmptyTrays = { ...G.emptyTrays };

      if (matrix === 'leftMatrix') {
        if (G.leftMatrix[col][row].face === 'blank') {
          newEmptyTrays[G.leftMatrix[col][row].suit] = G.emptyTrays[G.leftMatrix[col][row].suit] - 1;
        }
        newLeftMatrix = G.leftMatrix
          .slice(0, col)
          .concat([
            G.leftMatrix[col]
              .slice(0, row)
              .concat([card])
              .concat(G.leftMatrix[col].slice(row + 1, 3)),
          ])
          .concat(G.leftMatrix.slice(col + 1, 4));
      } else if (matrix === 'topMatrix') {
        if (G.topMatrix[col][row].face === 'blank') {
          newEmptyTrays[G.topMatrix[col][row].suit] = G.emptyTrays[G.topMatrix[col][row].suit] - 1;
        }
        newTopMatrix = G.topMatrix
          .slice(0, col)
          .concat([
            G.topMatrix[col]
              .slice(0, row)
              .concat([card])
              .concat(G.topMatrix[col].slice(row + 1, 3)),
          ])
          .concat(G.topMatrix.slice(col + 1, 4));
      }

      const newDots = updateDots(G, ctx.currentPlayer, newLeftMatrix, newTopMatrix);

      let newBustPlayers: number[] = [];
      if (G.count >= 23) {
        newBustPlayers = checkForBusts(newDots);
        if (newBustPlayers.length > 0) {
          ctx.events.endPhase();
        }
      }

      let bustPlayerCards = [...G.playerCards];
      newBustPlayers.forEach(p => {
        bustPlayerCards[p] = [];
        playerScores[p] = -Infinity;
      });

      let updatePlayerCards = bustPlayerCards
        .slice(0, player)
        .concat([newPlayerCards])
        .concat(bustPlayerCards.slice(player + 1, 4));

      let winner = checkForWinner(updatePlayerCards, newDots);
      console.log(winner);

      return {
        ...G,
        playerCards: updatePlayerCards,
        leftMatrix: newLeftMatrix,
        topMatrix: newTopMatrix,
        dots: newDots,
        count: G.count + 1,
        emptyTrays: newEmptyTrays,
        bustPlayers: newBustPlayers,
      };
    },

    dealCard(G: IG, ctx: IGameCtx, player: number, card: Card) {
      let newPlayerCards = [...G.playerCards[player]];
      newPlayerCards.push(card);
      let updatePlayerCards = G.playerCards
        .slice(0, player)
        .concat([newPlayerCards])
        .concat(G.playerCards.slice(player + 1, 4));
      return {
        ...G,
        playerCards: updatePlayerCards,
      };
    },
  },
  flow: {
    startingPhase: 'deal',
    endPhase: true,
    phases: {
      deal: {
        allowedMoves: [],
        onPhaseBegin: (G, ctx) => {
          const hands = [
            dealer.deck.slice(0, 13),
            dealer.deck.slice(13, 26),
            dealer.deck.slice(26, 39),
            dealer.deck.slice(39, 52),
          ];
          ctx.events.endPhase();
          return {
            ...G,
            playerCards: hands,
          };
        },
        next: 'fillDots',
      },
      fillDots: {
        turnOrder: {
          playOrder: () => [0, 1, 2, 3],
          first: G => getFirstPlayer(G),
          next: (_, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
          actionPlayers: {
            value: () => [0, 1, 2, 3],
            all: true,
            once: false,
            others: false,
          },
        },
        allowedMoves: ['placeCard'],
        next: 'finishGame',
      },
      finishGame: {
        onPhaseBegin: () => {
          console.log('Beginning the end game');
        },
        turnOrder: {
          playOrder: () => [0, 1, 2, 3],
          first: (G, ctx) => getNextLivePlayer(G, ctx.playOrderPos),
          next: (_, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
          actionPlayers: {
            value: G => getLivePlayers(G),
            all: true,
            once: false,
            others: false,
          },
        },
        allowedMoves: ['placeCard'],
      },
    },
    endGameIf: G => {
      if (G.count === 52) {
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

const emptyTrays: { [suit: string]: number } = {
  heart: 6,
  spade: 6,
  club: 6,
  diamond: 6,
};

const name_card: { [s: string]: Card } = {};
dealer.deck.forEach(card => {
  name_card[card.name] = card;
});

const playerCards: Card[][] = [[], [], [], []];

// const playerCards = [
//   aler.deck.slice(0, 13),
//   dealer.deck.slice(13, 26),
//   dealer.deck.slice(26, 39),
//   dealer.deck.slice(39, 52),de
// ];

// function deal(dealer: DealerService): Card[][] {
//   const playerCards: Card[][] = [
//     dealer.deck.slice(0, 13),
//     dealer.deck.slice(13, 26),
//     dealer.deck.slice(26, 39),
//     dealer.deck.slice(39, 52),
//   ];
//   return playerCards;
// }

const playerScores = [0, 0, 0, 0];

function checkForWinner(playerCards: Card[][], dots: Dot[][]) {
  console.log(playerCards);
  console.log(dots);
  return -1;
}

function getNextLivePlayer(G: IG, current: number): number {
  let livePlayers = [0, 1, 2, 3].filter(n => !G.bustPlayers.includes(n));
  let next = 0;
  while (livePlayers[next] < current) {
    next++;
  }
  console.log('Current players: ', livePlayers);
  console.log('Next to play:', livePlayers[next]);
  return livePlayers[next];
}

function getLivePlayers(G: IG): number[] {
  console.log('Bust are ', G.bustPlayers);
  return [0, 1, 2, 3].filter(n => !G.bustPlayers.includes(n));
}

function getFirstPlayer(G: IG): number {
  console.log('getting first player');
  let startPlayer = -1;
  for (let i = 0; i < 4; i++) {
    G.playerCards[i].forEach((c: Card) => {
      if (c.face === '2' && c.suit === 'club') {
        startPlayer = i;
      }
    });
  }
  return startPlayer;
}

function updateDots(G: IG, player: string, newLeftMatrix: Card[][], newTopMatrix: Card[][]) {
  let newDots = [...G.dots];
  let leftColumn = 0;
  let leftRow = 0;
  let topColumn = 0;
  let topRow = 0;
  for (leftRow = 0; leftRow < 3; leftRow++) {
    let filledrows = true;
    for (leftColumn = 0; leftColumn < 4; leftColumn++) {
      if (newLeftMatrix[leftColumn][leftRow].face === 'blank') {
        filledrows = false;
      }
    }
    if (filledrows) {
      for (topColumn = 0; topColumn < 3; topColumn++) {
        let filledcolumns = true;
        for (topRow = 0; topRow < 4; topRow++) {
          if (newTopMatrix[topRow][topColumn].face === 'blank') {
            console.log('top row:', topRow, 'top column:', topColumn, 'blank');
            filledcolumns = false;
          }
        }
        if (filledcolumns) {
          if (G.dots[leftRow][topColumn].player === 'nobody') {
            newDots = newDots
              .slice(0, leftRow)
              .concat([
                newDots[leftRow]
                  .slice(0, topColumn)
                  .concat([new Dot(player, getDotProduct(G, leftRow, topColumn, newLeftMatrix, newTopMatrix))])
                  .concat(newDots[leftRow].slice(topColumn + 1, 3)),
              ])
              .concat(newDots.slice(leftRow + 1, 3));
          } else {
            newDots = newDots
              .slice(0, leftRow)
              .concat([
                newDots[leftRow]
                  .slice(0, topColumn)
                  .concat([
                    new Dot(
                      newDots[leftRow][topColumn].player,
                      getDotProduct(G, leftRow, topColumn, newLeftMatrix, newTopMatrix),
                    ),
                  ])
                  .concat(newDots[leftRow].slice(topColumn + 1, 3)),
              ])
              .concat(newDots.slice(leftRow + 1, 3));
          }
        }
      }
    }
  }
  return newDots;
}

function getDotProduct(G: IG, leftRow: number, topColumn: number, newLeftMatrix: Card[][], newTopMatrix: Card[][]) {
  let dp = 0;
  for (let i = 0; i < 4; i++) {
    dp += newLeftMatrix[i][leftRow].value * newTopMatrix[i][topColumn].value;
  }
  return dp;
}

function checkForBusts(dots: Dot[][]): number[] {
  let playerDotCounts = [0, 0, 0, 0];
  let full = true;
  dots.forEach(row => {
    row.forEach(dot => {
      if (dot.player === 'nobody') {
        full = false;
      } else {
        playerDotCounts[Number(dot.player)]++;
      }
    });
  });
  let busts = [];
  for (let i = 0; i <= 3; i++) {
    if (playerDotCounts[i] == 0) {
      busts.push(i);
    }
  }
  if (full) {
    return busts;
  } else {
    return [];
  }
}
