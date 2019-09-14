import React from 'react';
import { Card } from '../shared/Card';
import { ICardProps } from '../properties';

export class CardComponent extends React.Component<ICardProps, {}> {
  onDragStart = (ev: any, card: Card) => {
    console.log(this.props.ctx.currentPlayer);
    console.log(this.props.playerID);
    if (this.props.ctx.currentPlayer === String(this.props.playerID)) {
      this.props.setDraggingTrue();
      this.props.setSelectedCard(card);
    } else {
      ev.preventDefault();
    }
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
        draggable={false}
      >
        <img user-select="none" width={this.props.size} src={String(this.props.card.image)} />
      </div>
    );
  }
}
