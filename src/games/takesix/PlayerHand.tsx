import * as React from 'react';
import { IG } from './game';
import { CardComponent } from './CardComponent';
import Typography from '@material-ui/core/Typography';
import Card from './card';

interface IPlayerHandProps {
  G: IG;
  playerID: string;
  selectCard: (index: number) => void;
}

interface IPlayerHandState {
  selectedCard?: Card;
}

export class PlayerHand extends React.Component<IPlayerHandProps, IPlayerHandState> {
  _selectCard = (i: number) => () => this.props.selectCard(i);

  render() {
    const selectedCard = this.props.G.players[this.props.playerID as any].selectedCard;
    console.log(this.props.G.players[this.props.playerID as any]);
    let selectedCardComp: any;
    if (selectedCard) {
      selectedCardComp = <CardComponent key={selectedCard.number} card={selectedCard} />;
    }
    return (
      <div>
        <div style={{ clear: 'both', marginTop: '8px' }}>
          <Typography style={{ color: 'white' }} variant="body2">
            Your hand
          </Typography>
        </div>
        <div
          style={{
            width: '100%',
          }}
        >
          {selectedCardComp}
          {this.props.G.players[this.props.playerID as any].cards.map((card, index: number) => {
            if (selectedCardComp) {
              return (
                <CardComponent
                  key={card.number}
                  click={this._selectCard(index)}
                  card={card}
                  opaque={true}
                  bounceIn={false}
                />
              );
            }
            return <CardComponent key={card.number} click={this._selectCard(index)} card={card} />;
          })}
        </div>
      </div>
    );
  }
}
