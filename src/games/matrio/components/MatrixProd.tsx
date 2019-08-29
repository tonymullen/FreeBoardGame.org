import React from 'react';
import { DotComponent } from './DotComponent';
// import { IG } from '../game';
import { IBoardProps } from '../properties';

class MatrixProd extends React.Component<IBoardProps, {}> {
  render() {
    const tableStyle = {
      backgroundColor: 'white',
    };

    const cellStyle = {
      border: '1px solid #555',
      width: '100px',
      height: '100px',
      lineHeight: '50px',
      textAlign: 'center' as 'center',
    };

    let tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        // const id = 3 * i + j;
        cells.push(
          <td key={j}>
            <div style={cellStyle}>
              <DotComponent
                //   dot={this.props.G.dots[i][j]}
                G={this.props.G}
                ctx={this.props.ctx}
                moves={this.props.moves}
                playerID={this.props.playerID}
                cards={this.props.cards}
              />
            </div>
          </td>,
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <table style={tableStyle} id="board">
          <tbody>{tbody}</tbody>
        </table>
      </div>
    );
  }
}

export { MatrixProd };
