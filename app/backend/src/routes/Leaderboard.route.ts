import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

class LeaderBoardRoute {
  route: Router;

  constructor() {
    this.route = Router();

    this.route.get('/home', [LeaderboardController.getAllHomeGames]);
  }
}

export default LeaderBoardRoute;
