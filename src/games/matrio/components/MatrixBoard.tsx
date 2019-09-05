import React from 'react';
import { MatrixA } from './MatrixA';
import { MatrixB } from './MatrixB';
import { MatrixProd } from './MatrixProd';
import { MatrixBoardProps } from '../properties';
import logo from '../assets/logo-angle.png';

class MatrixBoard extends React.Component<MatrixBoardProps, {}> {
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
                  cards={this.props.cards}
                  selectedCard={this.props.selectedCard}
                  setDraggingFalse={this.props.setDraggingFalse}
                  dragging={this.props.dragging}
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
