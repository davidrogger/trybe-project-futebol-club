import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';
import MatchService from '../services/Match.service';

class LeaderboardController {
  static async getAllHomeGames(_req: Request, res: Response) {
    const allMatchesFinished = await MatchService.findMatches(false);
    const matchesBoard = LeaderboardService.getAllMatchesByType(allMatchesFinished, 'home');
    const teamsBoard = LeaderboardService.teamBoard(matchesBoard);
    const orederedTeamsBoard = LeaderboardService.orderingTeamBoard(teamsBoard);

    res.status(200).json(orederedTeamsBoard);
  }

  static async getAllAwayGames(_req: Request, res: Response) {
    const allMatchesFinished = await MatchService.findMatches(false);
    const matchesBoard = LeaderboardService.getAllMatchesByType(allMatchesFinished, 'away');
    const teamsBoard = LeaderboardService.teamBoard(matchesBoard);
    const orederedTeamsBoard = LeaderboardService.orderingTeamBoard(teamsBoard);

    res.status(200).json(orederedTeamsBoard);
  }

  static async getAllGames(_req: Request, res: Response) {
    const allMatchesFinished = await MatchService.findMatches(false);
    const homeMatchesBoard = LeaderboardService.getAllMatchesByType(allMatchesFinished, 'home');
    const awayMatchesBoard = LeaderboardService.getAllMatchesByType(allMatchesFinished, 'away');
    const teamsBoard = LeaderboardService.teamBoard([...homeMatchesBoard, ...awayMatchesBoard]);
    const orederedTeamsBoard = LeaderboardService.orderingTeamBoard(teamsBoard);

    res.status(200).json(orederedTeamsBoard);
  }
}

export default LeaderboardController;
