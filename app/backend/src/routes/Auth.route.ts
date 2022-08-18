import { Router } from 'express';
import AuthController from '../controllers/Auth.controller';

class AuthRoute {
  public route: Router;

  constructor() {
    this.route = Router();

    this.route.post('/', AuthController.findUser);
    this.route.get('/validate', AuthController.userToken);
  }
}

export default AuthRoute;
