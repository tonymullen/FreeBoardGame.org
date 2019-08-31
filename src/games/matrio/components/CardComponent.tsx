import React from 'react';
import { IG } from '../game';
import { Card } from '../shared/Card';
import { IGameCtx } from '@freeboardgame.org/boardgame.io/core';

interface ICardProps {
  G: IG;
  ctx: IGameCtx;
  isActive: boolean;
  card: Card;
  size: string;
  moves: any;
  step: any;
}

export class CardComponent extends React.Component<ICardProps, {}> {
  //   isActive(id: number) {
  //     if (!this.props.isActive) return false;
  //     if (this.props.G.prodMatrix[id] !== null) return false;
  //     return true;
  //   }

  onDragStart = (ev: any, card: Card) => {
    // this.props.drag(card);
    ev.dataTransfer.setData('text/plain', card.name);
    localStorage.setItem('cardname', card.name);
  };

  onDragEnd = (ev: any) => {
    console.log('Drag end');
    //console.log(this.props.moves);
    // placeCard(cardname: string, row: number, col: number, matrix: 'leftMatrix' | 'topMatrix') {
    this.props.moves.placeCard(localStorage.getItem('cardname'), 7, 11, 'leftMatrix');
    this.props.step();
    localStorage.setItem('cardname', null);
  };

  render() {
    return (
      <div
        key={this.props.card.name}
        onDragStart={e => this.onDragStart(e, this.props.card)}
        onDragEnd={e => this.onDragEnd(e)}
        // draggable
        // className="draggable"
      >
        <img width={this.props.size} src={String(this.props.card.image)} />
      </div>
    );
  }
}
