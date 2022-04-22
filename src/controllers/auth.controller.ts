import { Response, NextFunction, Request } from 'express';
import { ErrorHandler } from '../config/error-handler';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({});
  } catch (err) {
    console.error(err);
    next(new ErrorHandler(500, err.message, err));
  }
};
