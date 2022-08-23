import MatchBoard from '../utils/MatchBoard';
import { IMatchModelAssociated } from '../interfaces/Match.interface';
import { ITeamBoardUpdate } from '../interfaces/Leaderboard.interface';
import TeamBoard from '../utils/TeamBoard';

class LeaderboardService {
  static getAllHomeMatches(matches: IMatchModelAssociated[]) {
    const homeTimesData = matches
      .map((match) => {
        const team = new MatchBoard(
          match.id,
          match.teamHome.teamName,
          match.homeTeamGoals,
          match.awayTeamGoals,
        );

        return team;
      });

    return homeTimesData;
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
}

export default LeaderboardService;
