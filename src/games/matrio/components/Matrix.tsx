import React from 'react';
import { MatrixProps } from '../properties';
import { playerCardStyle } from '../styles/PlayerColorStyles';
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
    if (this._isDroppable(this.props.selectedCard, trayContents, this.props.G.count)) {
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
    if (this._isDroppable(this.props.selectedCard, trayContents, this.props.G.count)) {
      this.setState({
        highlightDroppable: id,
      });
    }
  };

  onDragStart = (ev: any) => {
    ev.preventDefault();
  };

  onDragLeave = () => {
    this.setState({
      highlightDroppable: -1,
    });
  };
  _isDroppable = (card: Card, tray: Card, count: number) => {
    if (count < 1 && (card.face != '2' || card.suit != 'club')) {
      return false;
    }
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
    let cellStyle = {
      border: '1px solid #555',
      width: '70px',
      height: '100px',
      lineHeight: '50px',
      textAlign: 'center' as 'center',
    };

    if (this.props.left_or_top === 'topMatrix') {
      cellStyle.width = '100px';
      cellStyle.height = '70px';
      cellStyle.lineHeight = '70px';
    }

    const selectableCellStyle = {
      opacity: 1.0,
    };

    const draggingCellStyle = {
      opacity: 0.5,
    };

    const droppableCellStyle = playerCardStyle(Number(this.props.ctx.currentPlayer));

    // left matrix case
    let rows = 3;
    let columns = 4;
    if (this.props.left_or_top === 'topMatrix') {
      rows = 4;
      columns = 3;
    }
    let tbody = [];
    for (let i = 0; i < rows; i++) {
      let cells = [];
      for (let j = 0; j < columns; j++) {
        const id = columns * i + j;
        let thisCellStyle = cellStyle;
        let r = j;
        let c = i;
        if (this.props.left_or_top === 'topMatrix') {
          r = i;
          c = j;
        }
        if (this.props.dragging) {
          if (this.state.highlightDroppable === id) {
            thisCellStyle = { ...cellStyle, ...droppableCellStyle };
          } else if (this._isDroppable(this.props.selectedCard, this.props.mat[r][c], this.props.G.count)) {
            thisCellStyle = { ...cellStyle, ...selectableCellStyle };
          } else {
            thisCellStyle = { ...cellStyle, ...draggingCellStyle };
          }
        }

        let cardImageElement = (
          <img
            height="100%"
            src={String(this.props.mat[r][c].image)}
            alt="card"
            style={thisCellStyle}
            //
          ></img>
        );
        if (this.props.left_or_top === 'topMatrix') {
          cardImageElement = (
            <img
              width="67%"
              src={String(this.props.G.topMatrix[i][j].image)}
              style={{ transform: `translateY(-15px)rotate(-90deg)` }}
              alt="card"
            ></img>
          );
        }

        cells.push(
          <td key={id}>
            <div
              style={thisCellStyle}
              className="droppable"
              onDragOver={e => this.onDragOver(e, id, c, r)}
              onDrop={e => this.onDrop(e, c, r)}
              onDragLeave={() => this.onDragLeave()}
              onDragStart={e => this.onDragStart(e)}
            >
              {cardImageElement}
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
