import IResponseError from '../interfaces/IResponseError';

class NotFoundError extends Error implements IResponseError {
  status = 404;
}

export default NotFoundError;
