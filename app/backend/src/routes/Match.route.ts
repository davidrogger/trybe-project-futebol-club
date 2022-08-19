import { Router } from 'express';
import MatchController from '../controllers/Match.controller';

class MatchRoute {
  route: Router;

  constructor() {
    this.route = Router();

    this.route.get('/', MatchController.findMatches);
    this.route.post('/', MatchController.add);
  }
}

export default MatchRoute;
