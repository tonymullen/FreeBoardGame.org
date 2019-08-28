import React from 'react';
import Game from './Game';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { GAMES_MAP } from '../../games';
import { GameMode } from './GameModePicker';
import { MemoryRouter } from 'react-router';

describe('Game', () => {
  it('should render properly for multiplayer', async () => {
    for (const gameCode in GAMES_MAP) {
      if (GAMES_MAP.hasOwnProperty(gameCode)) {
        const game = GAMES_MAP[gameCode];
        const modes = game.modes;
        for (const mode of modes) {
          if (mode.mode === GameMode.OnlineFriend) {
            const app = (
              <MemoryRouter>
                <Game
                  match={{ params: { gameCode, mode: 'online' } }}
                  room={{
                    roomID: 'foo',
                    gameCode: 'tictactoe',
                    numberOfPlayers: 1,
                    players: [{ playerID: 0, roomID: 'foo' }],
                  }}
                />
              </MemoryRouter>
            );
            const wrapper = mount(app);
            await (wrapper.find(Game).instance() as any).promise;
            wrapper.update();
            expect(wrapper.html()).to.contain('Connecting');
          }
        }
      }
    }
  });

  // it('should render properly for singleplayer', async () => {
  //   for (const gameCode in GAMES_MAP) {
  //     if (GAMES_MAP.hasOwnProperty(gameCode)) {
  //       const game = GAMES_MAP[gameCode];
  //       const modes = game.modes;
  //       for (const mode of modes) {
  //         if (mode.mode === GameMode.LocalFriend) {
  //           const app = (
  //             <MemoryRouter>
  //               <Game match={{ params: { gameCode, mode: 'local' } }} />
  //             </MemoryRouter>
  //           );
  //           const wrapper = mount(app);
  //           await (wrapper.find(Game).instance() as any).promise;
  //           wrapper.update();
  //           expect(wrapper.find('Board').length).to.be.greaterThan(0);
  //         }
  //       }
  //     }
  //   }
  // });

  it('should render properly for ai', async () => {
    for (const gameCode in GAMES_MAP) {
      if (GAMES_MAP.hasOwnProperty(gameCode)) {
        const game = GAMES_MAP[gameCode];
        const modes = game.modes;
        for (const mode of modes) {
          if (mode.mode === GameMode.AI) {
            const app = (
              <MemoryRouter>
                <Game match={{ params: { gameCode, mode: 'AI' } }} />
              </MemoryRouter>
            );
            const wrapper = mount(app);
            await (wrapper.find(Game).instance() as any).promise;
            wrapper.update();
            expect(wrapper.find('Board').length).to.be.greaterThan(0);
          }
        }
      }
    }
  });

  it('should render error correctly with rejected Promise', async () => {
    GAMES_MAP.chess.config = () => Promise.reject(new Error('fail'));
    const app = (
      <MemoryRouter>
        <Game match={{ params: { gameCode: 'chess', mode: 'local' } }} />
      </MemoryRouter>
    );
    const wrapper = mount(app);
    await (wrapper.find(Game).instance() as any).promise;
    wrapper.update();
    expect(wrapper.html()).to.contain('Fail');
  });

  it('should render error correctly with unknown gameCode', async () => {
    const app = (
      <MemoryRouter>
        <Game match={{ params: { gameCode: 'notagame', mode: 'local' } }} />
      </MemoryRouter>
    );
    const wrapper = mount(app);
    await (wrapper.find(Game).instance() as any).promise;
    wrapper.update();
    expect(wrapper.html()).to.contain('Game Not Found');
  });

  it('should render error correctly with invalid game mode', async () => {
    const app = (
      <MemoryRouter>
        <Game match={{ params: { gameCode: 'chess', mode: 'invalid' } }} />
      </MemoryRouter>
    );
    const wrapper = mount(app);
    await (wrapper.find(Game).instance() as any).promise;
    wrapper.update();
    expect(wrapper.html()).to.contain('Invalid Game Mode');
  });

  it('should render loading correctly', () => {
    const app = (
      <MemoryRouter>
        <Game match={{ params: { gameCode: 'chess', mode: 'local' } }} />
      </MemoryRouter>
    );
    const wrapper = mount(app);
    (wrapper.find(Game).instance() as any).clear();
    (wrapper.find(Game).instance() as any).forceUpdate();
    expect(wrapper.html()).to.contain('Downloading');
  });

  it('should call componentWillUnmount() without error', () => {
    const app = (
      <MemoryRouter>
        <Game match={{ params: { gameCode: 'chess', mode: 'local' } }} />
      </MemoryRouter>
    );
    const wrapper = mount(app);
    (wrapper.find(Game).instance() as any).componentWillUnmount();
  });
});
