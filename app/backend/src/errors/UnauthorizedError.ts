import IResponseError from '../interfaces/IResponseError';

class UnauthorizedError extends Error implements IResponseError {
  status = 401;
}

export default UnauthorizedError;
