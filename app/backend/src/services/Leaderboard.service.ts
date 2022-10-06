import MatchBoard from '../entities/MatchBoard';
import { IMatchModelAssociated } from '../interfaces/Match.interface';
import { ITeamBoard, ITeamBoardUpdate } from '../interfaces/Leaderboard.interface';
import TeamBoard from '../entities/TeamBoard';

class LeaderboardService {
  static getAllMatchesByType(matches: IMatchModelAssociated[], teamType: string) {
    const teamName = teamType === 'home' ? 'teamHome' : 'teamAway';
    const teamGoals = teamType === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';
    const OpositeTeamGoals = teamType === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';
    const matchTeamData = matches
      .map((match) => {
        const team = new MatchBoard(
          match[teamName].teamName,
          match[teamGoals],
          match[OpositeTeamGoals],
        );

        return team;
      });

    return matchTeamData;
  }

  static teamBoard(matchesBoard: MatchBoard[]) {
    const teamBoard = matchesBoard
      .reduce((acc: ITeamBoardUpdate[], match) => {
        const updated = acc.findIndex((team) => team.name === match.teamName);

        if (updated !== -1) {
          acc[updated].update(match);
          return acc;
        }

        const team = new TeamBoard(match);
        team.goalsBalancerCalc();
        team.totalPointsCalc();
        team.efficiencyCalc();

        return [...acc, team];
      }, []);

    return teamBoard;
  }

  static orderingTeamBoard(teamBoard: ITeamBoard[]) {
    return teamBoard.sort((firstTeam, secondTeam) => {
      if (firstTeam.totalPoints > secondTeam.totalPoints) return -1;
      if (firstTeam.totalPoints < secondTeam.totalPoints) return 1;
      return this.tieBreakByVictories(firstTeam, secondTeam);
    });
  }

  static tieBreakByVictories(firstTeam: ITeamBoard, secondTeam: ITeamBoard): number {
    if (firstTeam.totalVictories > secondTeam.totalVictories) return -1;
    if (firstTeam.totalVictories < secondTeam.totalVictories) return 1;
    return this.tieBreakByGoalsBalance(firstTeam, secondTeam);
  }

  static tieBreakByGoalsBalance(firstTeam: ITeamBoard, secondTeam: ITeamBoard): number {
    if (firstTeam.goalsBalance > secondTeam.goalsBalance) return -1;
    if (firstTeam.goalsBalance < secondTeam.goalsBalance) return 1;
    return this.tieBreakByGoalsFavor(firstTeam, secondTeam);
  }

  static tieBreakByGoalsFavor(firstTeam: ITeamBoard, secondTeam: ITeamBoard): number {
    if (firstTeam.goalsFavor > secondTeam.goalsFavor) return -1;
    if (firstTeam.goalsFavor < secondTeam.goalsFavor) return 1;
    return this.tieBreakByGoalsOwn(firstTeam, secondTeam);
  }

  static tieBreakByGoalsOwn(firstTeam: ITeamBoard, secondTeam: ITeamBoard): number {
    if (firstTeam.goalsOwn > secondTeam.goalsOwn) return -1;
    if (firstTeam.goalsOwn < secondTeam.goalsOwn) return 1;
    return 0;
  }
}

export default LeaderboardService;
