import { Response } from 'express';

export class ErrorHandler extends Error {
  errors: any;
  statusCode: number;

  constructor(statusCode: number, message: string, errors: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

export const handleError = (err: any, res: Response) => {
  const { statusCode = 500, message, errors } = err;
  console.error(err);

  res.status(statusCode).json({
    status: 'error',
    message,
    errors,
  });
};
