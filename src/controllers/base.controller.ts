import { Router } from 'express';

export class BaseController {
  public router: Router;

  constructor() {
    this.router = Router();
  }
}
