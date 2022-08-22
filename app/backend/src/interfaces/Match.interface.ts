export interface ITeamGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface InewMatch extends ITeamGoals {
  homeTeam: number;
  awayTeam: number;
}
