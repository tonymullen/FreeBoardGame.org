import React from 'react';
import { CardComponent } from './CardComponent';
import { tableStyle } from '../styles/HandComponentStyles';
import { IHandProps } from '../properties';

export class Hand extends React.Component<IHandProps, {}> {
  isActive(id: number) {
    if (!this.props.isActive) return false;
    if (this.props.G.prodMatrix[id] !== null) return false;
    return true;
  }

  render() {
    // const cellStyle = {
    //   border: '1px solid #555',
    //   width: '70px',
    //   height: '100px',
    //   lineHeight: '50px',
    //   textAlign: 'center',
    // };

    const tdStyle = {
      width: '50px',
    };

    let tbody = [];
    let cardSize = this.props.playerID === 0 ? '70px' : '45px';
    let cardFlip = this.props.playerID === 0 ? false : true;
    let handDivStyle =
      this.props.playerID === 0
        ? { width: '960px', display: 'inline-flex' }
        : { width: '620px', display: 'inline-flex' };

    for (let i = 0; i < this.props.cards.length; i++) {
      this.props.cards[i].flip = cardFlip;
      tbody.push(
        <td style={tdStyle} key={i}>
          <CardComponent
            G={this.props.G}
            ctx={this.props.ctx}
            size={cardSize}
            card={this.props.cards[i]}
            moves={this.props.moves}
            events={this.props.events}
            step={this.props.step}
            isActive={false}
            //   drag={this.props.drag}
          />
        </td>,
      );
    }

    return (
      <div style={handDivStyle}>
        <table style={tableStyle(this.props.playerID)}>
          <tbody>
            <tr>{tbody}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}
