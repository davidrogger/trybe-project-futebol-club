import { Router } from 'express';
import AuthMiddleware from '../middlewares/Auth.middleware';
import MatchController from '../controllers/Match.controller';

class MatchRoute {
  route: Router;

  constructor() {
    this.route = Router();

    this.route.get('/', MatchController.findMatches);
    this.route.patch('/:id/finish', [MatchController.update]);
    this.route.post('/', [AuthMiddleware.userToken, MatchController.add]);
  }
}

export default MatchRoute;
