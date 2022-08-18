import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';

class AuthRoute {
  public route: Router;

  constructor() {
    this.route = Router();

    this.route.post('/', AuthController.findUser);
  }
}

export default AuthRoute;
