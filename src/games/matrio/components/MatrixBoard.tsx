import React from 'react';
import { Matrix } from './Matrix';
import { MatrixProd } from './MatrixProd';
import { MatrixBoardProps } from '../properties';
import logo from '../assets/logo-angle.png';

class MatrixBoard extends React.Component<MatrixBoardProps, {}> {
  render() {
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
                <Matrix
                  mat={this.props.G.topMatrix}
                  left_or_top={'topMatrix'}
                  G={this.props.G}
                  ctx={this.props.ctx}
                  moves={this.props.moves}
                  events={this.props.events}
                  step={this.props.step}
                  cards={this.props.cards}
                  selectedCard={this.props.selectedCard}
                  setDraggingFalse={this.props.setDraggingFalse}
                  dragging={this.props.dragging}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Matrix
                  mat={this.props.G.leftMatrix}
                  left_or_top={'leftMatrix'}
                  G={this.props.G}
                  ctx={this.props.ctx}
                  moves={this.props.moves}
                  events={this.props.events}
                  step={this.props.step}
                  cards={this.props.cards}
                  selectedCard={this.props.selectedCard}
                  setDraggingFalse={this.props.setDraggingFalse}
                  dragging={this.props.dragging}
                />
              </td>
              <td>
                <MatrixProd
                  G={this.props.G}
                  ctx={this.props.ctx}
                  moves={this.props.moves}
                  events={this.props.events}
                  step={this.props.step}
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
