import React from 'react';
import { Dot } from '../shared/Dot';
import { IDotProps } from '../properties';

export class DotComponent extends React.Component<IDotProps, {}> {
  render() {
    //let dot: Dot = this.props.G.dots[0][0];
    let color = '#bbb';
    console.log('Player is', this.props.dot.player);
    if (this.props.dot.player === '0') {
      color = 'blue';
    } else if (this.props.dot.player === '1') {
      color = 'orange';
    } else if (this.props.dot.player === '2') {
      color = 'yellow';
    } else if (this.props.dot.player === '3') {
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
      color: 'black',
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

    if (this.props.dot.player === 'nobody') {
      return <div></div>;
    } else {
      return (
        <div style={dotStyle}>
          <div style={innerStyle}>
            <div style={textDivStyle}>{this.props.dot.score}</div>
          </div>
        </div>
      );
    }
  }
}
