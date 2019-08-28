import * as React from 'react';
import { IGameArgs } from '../../App/Game/GameBoardWrapper';
import { GameLayout } from '../../App/Game/GameLayout';
import Typography from '@material-ui/core/Typography';
import { IGameCtx } from '@freeboardgame.org/boardgame.io/core';
import { IG } from './game';

interface IBoardProps {
  G: IG;
  ctx: IGameCtx;
  moves: any;
  playerID: string;
  gameArgs?: IGameArgs;
}

export class Board extends React.Component<IBoardProps, {}> {
  render() {
    if (this.props.ctx.gameover) {
      return (
        <GameLayout
          gameOver={this._getGameOver()}
          extraCardContent={this._getGameOverBoard()}
          gameArgs={this.props.gameArgs}
        />
      );
    }
    return <GameLayout>{this._getBoard()}</GameLayout>;
    // return (
    //   <GameLayout>
    //     <h2>Hello world!</h2>

    //     {/* <pre>{JSON.stringify(this.props.ctx, null, 2)}</pre>
    //     <pre>{JSON.stringify(this.props.gameArgs, null, 2)}</pre> */}
    //   </GameLayout>
    // );
  }
  _getBoard() {
    return (
      <div>
        <Typography variant="h5" style={{ textAlign: 'center', color: 'white', marginBottom: '16px' }}>
          Stuff
        </Typography>
        <svg width="100%" height="100%" viewBox="0 0 3 3">
          Yo
        </svg>
      </div>
    );
  }
  _getGameOver() {
    return "You're done!";
  }
  _getGameOverBoard() {
    return (
      <div style={{ textAlign: 'center' }}>
        <svg width="50%" height="50%" viewBox="0 0 3 3">
          Done
        </svg>
      </div>
    );
  }
}
