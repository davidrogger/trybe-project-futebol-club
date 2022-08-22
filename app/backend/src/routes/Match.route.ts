import { Router } from 'express';
import AuthMiddleware from '../middlewares/Auth.middleware';
import MatchController from '../controllers/Match.controller';

class MatchRoute {
  route: Router;

  constructor() {
    this.route = Router();

    this.route.patch('/:id/finish', [MatchController.updateProgress]);
    this.route.patch('/:id', [MatchController.updateGoals]);
    this.route.post('/', [AuthMiddleware.userToken, MatchController.add]);
    this.route.get('/', MatchController.findMatches);
  }
}

export default MatchRoute;
