import { Request, Response } from 'express';
import JwtService from '../services/Jwt.service';
import AuthService from '../services/Auth.service';
import InputValidator from '../services/InputValidator.service';

class AuthController {
  static async findUser(req: Request, res: Response) {
    const loginData = InputValidator.login(req.body);
    const userPayload = await AuthService.findUser(loginData);
    const token = JwtService.generateToken(userPayload);
    res.status(200).json({ token });
  }

  static async userToken(req: Request, res: Response) {
    const token = InputValidator.token(req.headers);
    const { role } = JwtService.verifyToken(token);
    res.status(200).json({ role });
  }
}

export default AuthController;
