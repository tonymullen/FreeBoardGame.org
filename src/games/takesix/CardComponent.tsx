import * as React from 'react';
import Card from './card';
import css from './CardComponent.css';

export interface ICardProps {
  card: Card;
  click?: () => void;
  opaque?: boolean;
  bounceIn?: boolean;
}

export class CardComponent extends React.Component<ICardProps, {}> {
  static defaultProps = {
    bounceIn: true,
  };
  render() {
    const values: any = {
      1: '#ffffff',
      2: '#3498db',
      3: '#f1c40f',
      5: '#e74c3c',
      7: '#8e44ad',
    };
    const opacity = this.props.opaque ? 0.2 : 1;
    const animation = this.props.bounceIn ? 'bounceIn 1.5s' : null;
    console.log(animation);
    return (
      <div
        onClick={this.props.click}
        className={css.Card}
        style={{
          background: values[this.props.card.value],
          opacity,
          animation,
        }}
      >
        <div
          className="CardValue"
          style={{
            textAlign: 'center',
            lineHeight: '20px',
          }}
        >
          {this.props.card.value}
        </div>
        <div
          className="CardNumber"
          style={{
            textAlign: 'center',
            lineHeight: '45px',
            verticalAlign: 'middle',
            fontSize: '2.5em',
          }}
        >
          {this.props.card.number}
        </div>
      </div>
    );
  }
}
