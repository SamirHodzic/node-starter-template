import { Response, NextFunction, Request } from 'express';
import { BaseController } from './base.controller';
import { UserService } from '../services/user.service';

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
    this.routes();
  }

  public userInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      res.status(200).json(await this.userService.getUserInfo(id));
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  public routes() {
    this.router.get(
      '/:id',
      this.userInfo
    );
  }
}
