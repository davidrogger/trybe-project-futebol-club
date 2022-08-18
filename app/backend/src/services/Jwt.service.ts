import * as jwt from 'jsonwebtoken';
import { IUserPayload } from '../interfaces/IUser.interface';
import UnauthorizedError from '../errors/UnauthorizedError';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class JwtService {
  static generateToken(payload: IUserPayload): string {
    return jwt.sign(payload, secret);
  }

  static verifyToken(token: string): IUserPayload {
    try {
      const userData = jwt.verify(token, secret);
      return userData as IUserPayload;
    } catch (error) {
      throw new UnauthorizedError('Token invalid');
    }
  }
}

export default JwtService;
