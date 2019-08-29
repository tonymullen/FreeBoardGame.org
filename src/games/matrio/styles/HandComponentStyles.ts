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
