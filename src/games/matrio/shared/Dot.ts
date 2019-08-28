export class Dot {
  _score: number;
  _player: string;
  //_value: number;

  constructor(player: string, score: number) {
    this._player = player;
    this._score = score;
  }

  get score() {
    return this._score;
  }

  set score(s) {
    this._score = s;
  }

  get player() {
    return this._player;
  }
}
