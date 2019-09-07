let colors: string[] = ['purple', 'yellow', 'orange', 'blue'];

export function tableStyle(player: number) {
  return {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderSpacing: '0',
    backgroundColor: colors[player],
    padding: '10px',
  };
}

export function playerCardStyle(player: number) {
  return {
    backgroundColor: colors[player],
  };
}

export function turnMarkerStyle(player: number) {
  return {
    borderRadius: '50%',
    border: 'solid 2px white',
    backgroundColor: colors[player],
    width: '50px',
    height: '50px',
    margin: 'auto',
  };
}
