import React from 'react';
import { Dot } from '../shared/Dot';
import { IBoardProps } from '../properties';

export class DotComponent extends React.Component<IBoardProps, {}> {
  render() {
    let dot: Dot = this.props.G.dots[0][0];
    let color = '#bbb';
    if (dot.player === 'Player 1') {
      color = 'blue';
    } else if (dot.player === 'Player 2') {
      color = 'orange';
    } else if (dot.player === 'Player 3') {
      color = 'yellow';
    } else if (dot.player === 'Player 4') {
      color = 'purple';
    }

    const dotStyle = {
      boxSizing: 'border-box' as 'border-box',
      height: '100px',
      width: '100px',
      backgroundColor: color,
      borderRadius: '50%',
      display: 'table-cell',
      borderStyle: 'solid',
      borderColor: 'gray',
      borderWidth: 'thin',
      verticalAlign: 'middle',
    };
    const innerStyle = {
      boxSizing: 'border-box' as 'border-box',
      height: '80px',
      width: '80px',
      backgroundColor: 'white',
      borderRadius: '50%',
      display: 'inline-flex',
      borderStyle: 'solid',
      borderColor: 'gray',
      borderWidth: 'thin',
      verticalAlign: 'middle',
      fontFamily: 'Nanum Pen Script',
      fontSize: '3em',
    };

    const textDivStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '50%',
      marginTop: '15%',
    };

    if (dot.player === 'nobody') {
      return <div></div>;
    } else {
      return (
        <div style={dotStyle}>
          <div style={innerStyle}>
            <div style={textDivStyle}>{dot.score}</div>
          </div>
        </div>
      );
    }
  }
}
