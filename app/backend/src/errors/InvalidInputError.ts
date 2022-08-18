import IResponseError from '../interfaces/IResponseError';

class InvalidInputError extends Error implements IResponseError {
  status = 400;
}

export default InvalidInputError;
