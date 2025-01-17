import React from 'react';
import { GameLayout } from '../../App/Game/GameLayout';
import { IBoardProps } from './properties';
import { MBoard } from './components/MBoard';

export class Board extends React.Component<IBoardProps, {}> {
  render() {
    // const bodyStyle = {
    //   margin: 0,
    //   padding: 0,
    //   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    //     "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    //     sans-serif,
    //   -webkit-font-smoothing: antialiased,
    //   -moz-osx-font-smoothing: grayscale,
    //   background-color: green,
    // };
    if (this.props.ctx.gameover) {
      return (
        <GameLayout
          gameOver={this._getGameOver()}
          extraCardContent={this._getGameOverBoard()}
          gameArgs={this.props.gameArgs}
        />
      );
    }
    return <GameLayout>{this._getBoard(this.props)}</GameLayout>;
    // return (
    //   <GameLayout>
    //     <h2>Hello world!</h2>
    //     {/* <pre>{JSON.stringify(this.props.ctx, null, 2)}</pre>
    //     <pre>{JSON.stringify(this.props.gameArgs, null, 2)}</pre> */}
    //   </GameLayout>
    // );
  }
  _getBoard(props: IBoardProps) {
    return (
      <MBoard
        G={props.G}
        ctx={props.ctx}
        moves={props.moves}
        step={props.step}
        events={props.events}
        cards={props.cards}
      ></MBoard>
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
