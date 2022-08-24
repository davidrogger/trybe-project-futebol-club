export interface ITeamBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface ITeamBoardUpdate extends ITeamBoard {
  update(teamMatch: IMatchBoard): void;
}

export interface IMatchBoard {
  teamName: string;
  goalsFavor: number;
  victory: number;
  goalsOwn: number;
  draw: number;
  loss: number;
}
