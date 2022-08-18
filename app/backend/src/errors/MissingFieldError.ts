import IResponseError from '../interfaces/IResponseError';

class MissingFieldError extends Error implements IResponseError {
  status = 400;
}

export default MissingFieldError;
