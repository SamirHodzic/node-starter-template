import express from 'express';
import compression from 'compression';
import lusca from 'lusca';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { handleError } from './config/error-handler';
import { CORS_OPTIONS } from './config/cors';
import { PORT } from './config/secrets';
import passport from './config/jwt';
import authRoutes from './routes/auth.routes';
import config from './config/db';

const app = express();

createConnection(config).then(async () => {
  console.log('AppDataSource has been initialized!');
});

app.set('port', PORT || 3000);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xssProtection(true));
app.use(cors(CORS_OPTIONS));

// app.use('/', passport.authenticate('jwt', { session: false }), withdrawRouter);
app.get('/', (_req, res: Response) => res.json({ message: 'It works!' }));
app.use('/api/auth', authRoutes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  handleError(err, res);
});

export default app;
