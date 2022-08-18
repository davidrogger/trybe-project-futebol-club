import MissingFieldError from '../errors/MissingFieldError';
import IUserLogin from '../interfaces/IUserLogin';

class InputValidator {
  static login(userLogin: IUserLogin): IUserLogin {
    if (!userLogin.email || !userLogin.password) {
      throw new MissingFieldError('All fields must be filled');
    }
    return userLogin;
  }
}

export default InputValidator;
