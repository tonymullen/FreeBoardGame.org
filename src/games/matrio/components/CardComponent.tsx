import React from 'react';
// import { IG } from '../game';
import { Card } from '../shared/Card';
// import { IGameCtx } from '@freeboardgame.org/boardgame.io/core';
import { ICardProps } from '../properties';

export class CardComponent extends React.Component<ICardProps, {}> {
  //   isActive(id: number) {
  //     if (!this.props.isActive) return false;
  //     if (this.props.G.prodMatrix[id] !== null) return false;
  //     return true;
  //   }

  onDragStart = (ev: any, card: Card) => {
    ev.dataTransfer.setData('text/plain', card.name);
  };

  onDragEnd = () => {
    //console.log('end drag');
    //const cardname = ev.dataTransfer.getData('text/plain');
    //console.log(this.props.moves);
    // placeCard(cardname: string, row: number, col: number, matrix: 'leftMatrix' | 'topMatrix') {
    // this.props.moves.placeCard(localStorage.getItem('cardname'), 7, 11, 'leftMatrix');
    //this.props.moves.placeCard(this.props.card.name, 7, 11, 'leftMatrix');
    //this.props.events.endTurn();
    //this.props.step();
    //localStorage.setItem('cardname', null);
  };

  render() {
    return (
      <div
        key={this.props.card.name}
        onDragStart={e => this.onDragStart(e, this.props.card)}
        // onDragEnd={() => this.onDragEnd()}
        draggable
        className="draggable"
      >
        <img width={this.props.size} src={String(this.props.card.image)} />
      </div>
    );
  }
}
