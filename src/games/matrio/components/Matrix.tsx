import React from 'react';
import { MatrixProps } from '../properties';
import { Card } from '../shared/Card';

class Matrix extends React.Component<
  MatrixProps,
  {
    highlightDroppable: number;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      highlightDroppable: -1,
    };
  }

  onDrop = (ev: any, row: number, col: number) => {
    ev.preventDefault();
    let trayContents = this.props.mat[col][row];
    let cardname = this.props.selectedCard.name;
    if (this._isDroppable(this.props.selectedCard, trayContents)) {
      this.props.moves.placeCard(cardname, row, col, this.props.left_or_top);
    }
    this.setState({
      highlightDroppable: -1,
    });
    this.props.setDraggingFalse();
  };

  onDragOver = (ev: any, id: any, row: number, col: number) => {
    ev.preventDefault();
    let trayContents = this.props.mat[col][row];
    if (this._isDroppable(this.props.selectedCard, trayContents)) {
      this.setState({
        highlightDroppable: id,
      });
    }
  };

  _isDroppable = (card: Card, tray: Card) => {
    const NO_EMPTIES = 0;
    if (card.face === 'joker') {
      return true;
    }
    if (
      (this.props.G.emptyTrays[card.suit] > NO_EMPTIES && (card.suit === tray.suit && tray.face === 'blank')) ||
      (this.props.G.emptyTrays[card.suit] <= NO_EMPTIES && tray.face != 'blank')
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const cellStyle = {
      border: '1px solid #555',
      width: '70px',
      height: '100px',
      lineHeight: '50px',
      textAlign: 'center' as 'center',
      opacity: 1.0,
    };

    const draggingCellStyle = {
      border: '1px solid #555',
      width: '70px',
      height: '100px',
      lineHeight: '50px',
      textAlign: 'center' as 'center',
      opacity: 0.5,
    };

    const droppableCellStyle = {
      border: '10px solid #ff0000',
      width: '70px',
      height: '100px',
      lineHeight: '50px',
      textAlign: 'center' as 'center',
      boxSshadow: 'inset 0px 0px 0px 10px red',
      boxSizing: 'border-box',
      opacity: 1.0,
    };

    let tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 4; j++) {
        const id = 4 * i + j;
        let thisCellStyle = cellStyle;
        if (this.props.dragging) {
          if (this.state.highlightDroppable === id) {
            thisCellStyle = droppableCellStyle;
          } else if (this.props.mat[j][i].suit === this.props.selectedCard.suit) {
            thisCellStyle = cellStyle;
          } else {
            thisCellStyle = draggingCellStyle;
          }
        }
        cells.push(
          <td key={id}>
            <div
              style={thisCellStyle}
              className="droppable"
              onDragOver={e => this.onDragOver(e, id, i, j)}
              onDrop={e => this.onDrop(e, i, j)}
            >
              <img height="100%" src={String(this.props.mat[j][i].image)} alt="card"></img>
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

export { Matrix };
