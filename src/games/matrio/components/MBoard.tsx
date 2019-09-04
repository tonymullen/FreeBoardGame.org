import React from 'react';
import { MatrixBoard } from './MatrixBoard';
import { IBoardProps } from '../properties';
import { Hand } from './Hand';
//import { Card } from '../shared/Card';

export class MBoard extends React.Component<IBoardProps, {}> {
  constructor(props: any) {
    super(props);
    // this.state = {
    //   selectedCard: null,
    // };
  }

  // setSelectedCard(card: Card): void {
  //   this.setState({
  //     selectedCard: card,
  //   });
  // }

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
      borderSpacing: '10px',
      backgroundColor: 'darkgreen',
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
                  events={this.props.events}
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
                      events={this.props.events}
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
                  events={this.props.events}
                  step={this.props.step}
                  cards={this.props.cards}
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
                      events={this.props.events}
                      step={this.props.step}
                      isActive={false}
                      //
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <Hand
                  G={this.props.G}
                  ctx={this.props.ctx}
                  cards={this.props.G.playerCards[0]}
                  playerID={0}
                  moves={this.props.moves}
                  events={this.props.events}
                  step={this.props.step}
                  isActive={false}
                  //
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
