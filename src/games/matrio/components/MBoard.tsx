import React from 'react';
import { MatrixBoard } from './MatrixBoard';
import { Hand } from './Hand';
import { IBoardProps } from '../properties';

export class MBoard extends React.Component<IBoardProps, {}> {
  render() {
    const cellStyle = {
      width: '50px',
      height: '50px',
      paddingLeft: '10px',
      paddingRight: '10px',
      textAlign: 'center' as 'center',
    };
    const tableStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      borderSpacing: '0',
    };
    const headerStyle = {
      height: '50px',
    };

    return (
      <div>
        <div style={headerStyle}></div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td></td>
              <td style={cellStyle}>
                <Hand
                  G={this.props.G}
                  ctx={this.props.ctx}
                  cards={this.props.G.playerCards[2]}
                  playerID={2}
                  moves={this.props.moves}
                  step={this.props.step}
                  isActive={false}
                  // sth
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td style={cellStyle}>
                <div
                  style={{
                    width: '80px',
                    height: '650px',
                  }}
                >
                  <div
                    style={{
                      transform: `rotate(90deg)`,
                    }}
                  >
                    <Hand
                      G={this.props.G}
                      ctx={this.props.ctx}
                      cards={this.props.G.playerCards[1]}
                      playerID={1}
                      moves={this.props.moves}
                      step={this.props.step}
                      isActive={false}
                      //
                    />
                  </div>
                </div>
              </td>
              <td>
                <MatrixBoard
                  G={this.props.G}
                  ctx={this.props.ctx}
                  moves={this.props.moves}
                  step={this.props.step}
                  playerID={this.props.playerID}
                  cards={this.props.cards}
                  // step={this.props.step}
                  // images={this.props.ctx.images}
                  // G = {this.props.G}
                  // placeCard={this.props.moves.placeCard}
                  // dragging = {this.state.dragging}
                  // next={nextPlayerGo}
                  // end={this.props.events.endTurn}
                />
              </td>
              <td style={cellStyle}>
                <div
                  style={{
                    width: '80px',
                    height: '650px',
                  }}
                >
                  <div
                    style={{
                      transformOrigin: 'center',
                      transform: `rotate(90deg)`,
                    }}
                  >
                    <Hand
                      G={this.props.G}
                      ctx={this.props.ctx}
                      cards={this.props.G.playerCards[3]}
                      playerID={3}
                      moves={this.props.moves}
                      step={this.props.step}
                      isActive={false}
                      //
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Hand
          G={this.props.G}
          ctx={this.props.ctx}
          cards={this.props.G.playerCards[0]}
          playerID={0}
          moves={this.props.moves}
          step={this.props.step}
          isActive={false}
          //
        />
      </div>
    );
  }
}
