import { Response, NextFunction, Request } from 'express';
import { check } from 'express-validator';
import validationMiddleware from '../util/validation.middleware';
import { AuthService } from '../services/auth.service';
import { BaseController } from './base.controller';

export class AuthController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
    this.routes();
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      res.status(200).json(await this.authService.login(email, password));
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      res.status(200).json(await this.authService.signup(username, email, password));
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  public routes() {
    this.router.post(
      '/login',
      [
        check('email').notEmpty().withMessage('Email is required'),
        check('password').notEmpty().withMessage('Password is required'),
      ],
      validationMiddleware,
      this.login
    );
    this.router.post(
      '/signup',
      [
        check('username').notEmpty().withMessage('Username is required'),
        check('email').notEmpty().withMessage('Email is required'),
        check('passwordConfirm').notEmpty().withMessage('Password confirm is required'),
        check('password')
          .notEmpty()
          .custom((value, { req }) => {
            if (value !== req.body.passwordConfirm) {
              throw new Error('Passwords don\'t match');
            } else {
              return value;
            }
          }),
      ],
      validationMiddleware,
      this.signup
    );
  }
}
