import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';
import MatchService from '../services/Match.service';

class LeaderboardController {
  static async getAllHomeGames(_req: Request, res: Response) {
    const allMatchesFinished = await MatchService.findMatches(false);
    const matchBoard = LeaderboardService.getAllMatchesByType(allMatchesFinished, 'home');
    const teamBoard = LeaderboardService.teamBoard(matchBoard);
    const orederedTeamBoard = LeaderboardService.orderingTeamBoard(teamBoard);

    res.status(200).json(orederedTeamBoard);
  }

  static async getAllAwayGames(_req: Request, res: Response) {
    const allMatchesFinished = await MatchService.findMatches(false);
    const matchBoard = LeaderboardService.getAllMatchesByType(allMatchesFinished, 'away');
    const teamBoard = LeaderboardService.teamBoard(matchBoard);
    const orederedTeamBoard = LeaderboardService.orderingTeamBoard(teamBoard);

    res.status(200).json(orederedTeamBoard);
  }
}

export default LeaderboardController;
