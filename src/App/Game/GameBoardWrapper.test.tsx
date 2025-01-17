import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { GameMode } from './GameModePicker';
import { gameBoardWrapper } from './GameBoardWrapper';

Enzyme.configure({ adapter: new Adapter() });

class MockBoard extends React.Component<any, any> {
  render() {
    return <div>foo</div>;
  }
}

describe('GameBoardWrapper', () => {
  it('should not show warning', () => {
    const Board = gameBoardWrapper({
      board: MockBoard,
      gameArgs: {
        gameCode: 'chess',
        mode: GameMode.OnlineFriend,
      },
    });
    const wrapper = Enzyme.mount(<Board isConnected={true} G={{ pgn: '' }} ctx={{}} />);
    expect(wrapper.find('AlertLayer').length).to.equal(0);
  });

  it('should show disconnected warning', () => {
    const Board = gameBoardWrapper({
      board: MockBoard,
      gameArgs: {
        gameCode: 'chess',
        mode: GameMode.OnlineFriend,
      },
    });
    const wrapper = Enzyme.mount(<Board isConnected={false} G={{ pgn: '' }} ctx={{}} />);
    expect(wrapper.html()).to.contain('Connection lost');
  });
});
