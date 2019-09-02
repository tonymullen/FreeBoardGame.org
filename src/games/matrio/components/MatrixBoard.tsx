import React from 'react';
import { MatrixA } from './MatrixA';
import { MatrixB } from './MatrixB';
import { MatrixProd } from './MatrixProd';
import { IBoardProps } from '../properties';
import logo from '../assets/logo-angle.png';

class MatrixBoard extends React.Component<IBoardProps, {}> {
  render() {
    // console.log(this.props);
    // console.log(this.props.G);
    const tableStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      borderSpacing: '0',
      backgroundColor: 'green',
    };

    return (
      <div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td>
                <img src={logo} width="300px"></img>
              </td>
              <td>
                <MatrixB
                  G={this.props.G}
                  ctx={this.props.ctx}
                  moves={this.props.moves}
                  events={this.props.events}
                  step={this.props.step}
                  playerID={this.props.playerID}
                  cards={this.props.cards}
                  // G={this.props.G} placeCard={this.props.placeCard} dragging={this.props.dragging}
                />
              </td>
            </tr>
            <tr>
              <td>
                <MatrixA
                  G={this.props.G}
                  ctx={this.props.ctx}
                  moves={this.props.moves}
                  events={this.props.events}
                  step={this.props.step}
                  playerID={this.props.playerID}
                  cards={this.props.cards}
                  //   end={this.props.end}
                  //   next={this.props.next}
                  //   G={this.props.G}
                  //   placeCard={this.props.placeCard}
                  //   dragging={this.props.dragging}
                  //   step={this.props.step}
                />
              </td>
              <td>
                <MatrixProd
                  G={this.props.G}
                  ctx={this.props.ctx}
                  moves={this.props.moves}
                  events={this.props.events}
                  step={this.props.step}
                  playerID={this.props.playerID}
                  cards={this.props.cards}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export { MatrixBoard };
