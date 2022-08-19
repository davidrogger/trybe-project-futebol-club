import { Router } from 'express';
import AuthMiddleware from '../middlewares/Auth.middleware';
import AuthController from '../controllers/Auth.controller';

class AuthRoute {
  public route: Router;

  constructor() {
    this.route = Router();

    this.route.post('/', AuthController.findUser);
    this.route.get('/validate', [AuthMiddleware.userToken, AuthController.userRole]);
  }
}

export default AuthRoute;
