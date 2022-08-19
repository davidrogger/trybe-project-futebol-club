import { NextFunction, Request, Response } from 'express';
import JwtService from '../services/Jwt.service';
import InputValidator from '../services/InputValidator.service';

class AuthMiddleware {
  static async userToken(req: Request, res: Response, next: NextFunction) {
    const token = InputValidator.token(req.headers);
    const userData = JwtService.verifyToken(token);
    res.locals = userData;
    next();
  }
}

export default AuthMiddleware;
