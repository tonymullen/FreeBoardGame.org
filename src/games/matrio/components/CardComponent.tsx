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
    // ev.dataTransfer.setData('text/plain', card.name);
    this.props.setDraggingTrue();
    this.props.setSelectedCard(card);
  };

  onDragEnd = () => {
    this.props.setDraggingFalse();
  };

  render() {
    return (
      <div
        key={this.props.card.name}
        onDragStart={e => this.onDragStart(e, this.props.card)}
        onDragEnd={() => this.onDragEnd()}
        draggable
        className="draggable"
      >
        <img width={this.props.size} src={String(this.props.card.image)} />
      </div>
    );
  }
}
