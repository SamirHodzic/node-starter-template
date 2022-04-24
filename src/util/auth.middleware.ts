import { NextFunction, Request, Response } from 'express';
import passport from '../config/jwt';
import { ApiError } from './error-handler';

export default function (req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    err || !user ? next(new ApiError(401, 'Unathorized')) : next();
  })(req, res, next);
}
