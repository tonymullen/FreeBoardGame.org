import React from 'react';
import { IG } from '../game';
import { Card } from '../shared/Card';

interface ICardProps {
  G: IG;
  isActive: boolean;
  card: Card;
  size: string;
}

export class CardComponent extends React.Component<ICardProps, {}> {
  //   isActive(id: number) {
  //     if (!this.props.isActive) return false;
  //     if (this.props.G.prodMatrix[id] !== null) return false;
  //     return true;
  //   }

  // onDragStart = (ev, card) => {
  //   this.props.drag(card);
  //   ev.dataTransfer.setData('text/plain', card.name);
  //   localStorage.setItem('cardname', card.name);
  // };

  // onDragEnd = ev => {
  //   localStorage.setItem('cardname', null);
  // };

  render() {
    return (
      <div
      // key={this.props.card.name}
      // onDragStart={e => this.onDragStart(e, this.props.card)}
      // draggable
      // className="draggable"
      >
        <img width={this.props.size} src={String(this.props.card.image)} />
      </div>
    );
  }
}
