import { NextFunction, Request, Response } from 'express';
import IResponseError from '../interfaces/IResponseError';

class ErrorHandlerMiddleware {
  static response = (err: IResponseError, _req: Request, res: Response, _next: NextFunction) => {
    const { message, status } = err;
    const statusCode = status || 500;
    res.status(statusCode).json({ message });
  };
}

export default ErrorHandlerMiddleware;
