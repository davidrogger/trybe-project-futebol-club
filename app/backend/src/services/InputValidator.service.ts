import { IncomingHttpHeaders } from 'http';
import UnauthorizedError from '../errors/UnauthorizedError';
import MissingFieldError from '../errors/MissingFieldError';
import IUserLogin from '../interfaces/IUserLogin';

class InputValidator {
  static login(userLogin: IUserLogin): IUserLogin {
    if (!userLogin.email || !userLogin.password) {
      throw new MissingFieldError('All fields must be filled');
    }
    return userLogin;
  }

  static token({ authorization }: IncomingHttpHeaders): string {
    if (!authorization) throw new UnauthorizedError('Missing Token');
    return authorization;
  }
}

export default InputValidator;
