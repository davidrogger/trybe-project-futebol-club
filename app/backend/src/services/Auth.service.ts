import { IUserPayload } from '../interfaces/IUser.interface';
import UserModel from '../database/models/UserModel';
import IUserLogin from '../interfaces/IUserLogin';
import PasswordHash from './PasswordHash.service';
import UnauthorizedError from '../errors/UnauthorizedError';

class AuthService {
  static async findUser({ email, password }: IUserLogin): Promise<IUserPayload> {
    const userData = await UserModel.findOne({ where: { email } });
    if (!userData) throw new UnauthorizedError('Incorrect email or password');
    if (userData) {
      const passwordCheck = PasswordHash.verify(password, userData.password);
      if (!passwordCheck) throw new UnauthorizedError('Incorrect email or password');
    }
    const { role } = userData;
    return { email, role };
  }
}

export default AuthService;
