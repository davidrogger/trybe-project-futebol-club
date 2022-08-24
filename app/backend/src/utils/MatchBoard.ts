import { IMatchBoard } from '../interfaces/Leaderboard.interface';

class MatchBoard implements IMatchBoard {
  private _victory = 0;
  private _draw = 0;
  private _loss = 0;

  constructor(
    private _TeamName: string,
    private _goalsFavor: number,
    private _goalsOwn: number,

  ) {
    this.victoryCalc();
    this.drawCalc();
    this.lossCalc();
  }

  get teamName() {
    return this._TeamName;
  }

  get goalsFavor() {
    return this._goalsFavor;
  }

  get goalsOwn() {
    return this._goalsOwn;
  }

  get victory() {
    return this._victory;
  }

  get draw() {
    return this._draw;
  }

  get loss() {
    return this._loss;
  }

  lossCalc() {
    this._loss += this._goalsFavor < this._goalsOwn ? 1 : 0;
  }

  victoryCalc() {
    this._victory += this._goalsFavor > this._goalsOwn ? 1 : 0;
  }

  drawCalc() {
    this._draw += this.goalsFavor === this._goalsOwn ? 1 : 0;
  }
}

export default MatchBoard;
