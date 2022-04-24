import express, { Request, Response, NextFunction } from 'express';
import errorHandler from 'errorhandler';
import compression from 'compression';
import lusca from 'lusca';
import cors from 'cors';
import { createConnection } from 'typeorm';
import passport from './config/jwt';
import { CORS_OPTIONS } from './config/cors';
import config from './config/db';
import { NODE_ENV, PORT } from './config/secrets';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { handleError } from './util/error-handler';
import validationMiddleware from './util/validation.middleware';
import authMiddleware from './util/auth.middleware';

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  public async config() {
    await createConnection(config);
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(lusca.xssProtection(true));
    this.app.use(cors(CORS_OPTIONS));
    this.app.use(validationMiddleware);
    this.routes();
    this.app.use(
      (err: any, _req: Request, res: Response, _next: NextFunction) => {
        handleError(err, res);
      }
    );
  }

  public routes() {
    this.app.get('/', (_req: Request, res: Response) =>
      res.json({ message: 'It works!' })
    );
    this.app.use('/api/auth', new AuthController().router);
    this.app.use('/api/user', authMiddleware, new UserController().router);
  }

  public start() {
    if (NODE_ENV === 'development') {
      this.app.use(errorHandler());
    }

    this.app.listen(PORT, () => {
      console.info('Service is running on port %d in %s mode', PORT, NODE_ENV);
    });
  }
}

const server = new Server();
server.start();
