export interface ITeamGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
// remote unknown fail
export interface InewMatch extends ITeamGoals {
  homeTeam: number;
  awayTeam: number;
}
