import { Router } from 'express';
import TeamController from '../controllers/Team.controller';

class TeamRoute {
  route: Router;

  constructor() {
    this.route = Router();
    this.route.get('/', TeamController.getAll);
  }
}

export default TeamRoute;
