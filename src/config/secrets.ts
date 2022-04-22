import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const DB_QUERY_LOGGING = process.env.DB_QUERY_LOGGING;
export const POOL_MAX_SIZE = process.env.POOL_MAX_SIZE;
