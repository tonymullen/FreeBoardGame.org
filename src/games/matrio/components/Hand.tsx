import React from 'react';
import { CardComponent } from './CardComponent';
import { Card } from '../shared/Card';
import { tableStyle } from '../styles/HandComponentStyles';
import { IG } from '../game';
import { IGameCtx } from '@freeboardgame.org/boardgame.io/core';

interface IHandProps {
  G: IG;
  ctx: IGameCtx;
  isActive: boolean;
  cards: Card[];
  moves: any;
  step: any;
  playerID: number;
}

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
            step={this.props.step}
            isActive={false}
            //   drag={this.props.drag}
          />
        </td>,
      );
    }

    return (
      <div>
        <table style={tableStyle(this.props.playerID)}>
          <tbody>
            <tr>{tbody}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}
