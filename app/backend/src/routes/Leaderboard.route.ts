import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

class LeaderBoardRoute {
  route: Router;

  constructor() {
    this.route = Router();

    this.route.get('/home', [LeaderboardController.getAllHomeGames]);
    this.route.get('/away', [LeaderboardController.getAllAwayGames]);
    this.route.get('/', [LeaderboardController.getAllGames]);
  }
}

export default LeaderBoardRoute;
