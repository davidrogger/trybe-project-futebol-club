import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';
import MatchService from '../services/Match.service';

class LeaderboardController {
  static async getAllHomeGames(req: Request, res: Response) {
    const allMatchesFinished = await MatchService.findMatches(false);
    const matchBoard = LeaderboardService.getAllHomeMatches(allMatchesFinished);
    const teamBoard = LeaderboardService.teamBoard(matchBoard);
    const orederedTeamBoard = LeaderboardService.orderingTeamBoard(teamBoard);

    res.status(200).json(orederedTeamBoard);
  }
}

export default LeaderboardController;
