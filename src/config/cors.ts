export const CORS_OPTIONS = {
  origin: '*',
  credentials: true,
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
    'X-Body-Signature',
  ],
  exposedHeaders: ['Content-Length'],
  preflightContinue: false,
};
