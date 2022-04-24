import { Response } from 'express';

export class ApiError extends Error {
  httpStatusCode: number;
  message: any;
  timestamp: Date;
  constructor(httpStatusCode = 500, message: any, ...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.timestamp = new Date();
  }
}

export const handleError = (err: any, res: Response) => {
  const { httpStatusCode = 500, message, timestamp } = err;

  res.status(httpStatusCode).json({
    status: 'error',
    code: httpStatusCode,
    message,
    timestamp,
  });
};
