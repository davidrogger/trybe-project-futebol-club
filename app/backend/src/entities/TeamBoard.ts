import { IMatchBoard, ITeamBoard } from '../interfaces/Leaderboard.interface';

class TeamBoard implements ITeamBoard {
  public name: string;
  public totalPoints = 0;
  public totalGames = 1;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: string;

  constructor(
    teamData: IMatchBoard,
  ) {
    this.name = teamData.teamName;
    this.totalVictories = teamData.victory;
    this.totalDraws = teamData.draw;
    this.totalLosses = teamData.loss;
    this.goalsFavor = teamData.goalsFavor;
    this.goalsOwn = teamData.goalsOwn;
  }

  update(teamMatch: IMatchBoard) {
    this.goalsFavor += teamMatch.goalsFavor;
    this.goalsOwn += teamMatch.goalsOwn;
    this.totalVictories += teamMatch.victory;
    this.totalLosses += teamMatch.loss;
    this.totalDraws += teamMatch.draw;
    this.totalGames += 1;
    this.goalsBalancerCalc();
    this.totalPointsCalc();
    this.efficiencyCalc();
  }

  goalsBalancerCalc() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  totalPointsCalc() {
    this.totalPoints = (this.totalVictories * 3) + this.totalDraws;
  }

  efficiencyCalc() {
    const efficencyPercent = (this.totalPoints / (this.totalGames * 3)) * 100;
    this.efficiency = efficencyPercent.toFixed(2);
  }
}

export default TeamBoard;
