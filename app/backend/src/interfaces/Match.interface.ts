import MatchModel from '../database/models/MatchModel';

export interface ITeamGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface InewMatch extends ITeamGoals {
  homeTeam: number;
  awayTeam: number;
}
export interface IMatchModelAssociated extends MatchModel {
  teamHome: {
    teamName: string;
  },
  teamAway: {
    teamName: string,
  }
}
