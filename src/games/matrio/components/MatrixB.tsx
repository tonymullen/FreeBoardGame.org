import React from 'react';
import { MatrixBoardProps } from '../properties';

class MatrixB extends React.Component<MatrixBoardProps, {}> {
  onDrop = (ev: any, row: number, col: number) => {
    ev.preventDefault();
    let trayContents = this.props.G.topMatrix[col][row];
    let cardname = ev.dataTransfer.getData('text');
    if (this.props.G.name_card[cardname].suit == trayContents.suit || trayContents.face != 'blank') {
      this.props.moves.placeCard(cardname, row, col, 'topMatrix');
    }
  };

  onDragOver = (ev: any, id: any) => {
    ev.preventDefault();
    console.log('Over top Matrix', id);
  };

  //   onDrop = (ev, row, col) => {
  //     ev.preventDefault();
  //     let cardname = ev.dataTransfer.getData('text');
  //     this.props.placeCard(cardname, row, col, 'topMatrix');
  //   };

  // onDragOver = (ev: any) => {
  //   ev.preventDefault();
  //   console.log('Over Top Matrix');
  // };

  render() {
    const cellStyle = {
      border: '1px solid #555',
      width: '100px',
      height: '70px',
      lineHeight: '70px',
      textAlign: 'center' as 'center',
    };

    let tbody = [];
    // let suits = ['spade', 'diamond', 'club', 'heart'];
    for (let i = 0; i < 4; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        cells.push(
          <td key={id}>
            <div
              style={cellStyle}
              className="droppable"
              onDragOver={e => this.onDragOver(e, id)}
              onDrop={
                //this.props.G.canDropCard(this.props.G, this.props.G.leftMatrix, j, i, this.props.dragging)
                //? e => {
                e => this.onDrop(e, j, i)
                //</td>}
                //: null
              }
            >
              <img
                width="67%"
                src={String(this.props.G.topMatrix[i][j].image)}
                style={{ transform: `translateY(-15px)rotate(-90deg)` }}
                alt="card"
              ></img>
            </div>
          </td>,
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }
    const tableStyle = {
      backgroundColor: 'white',
    };

    return (
      <div>
        <table style={tableStyle} id="board">
          <tbody>{tbody}</tbody>
        </table>
      </div>
    );
  }
}

export { MatrixB };
