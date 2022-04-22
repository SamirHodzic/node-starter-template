import { ConnectionOptions } from 'typeorm';
import {
  DB_QUERY_LOGGING,
  POOL_MAX_SIZE,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './secrets';

console.log(__dirname + './src/db/entities/*{.ts,.js}');

const config: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: +POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  ssl: false,
  migrationsRun: true,
  logging: DB_QUERY_LOGGING === 'true',

  entities: ['src/db/entities/*{.ts,.js}'],
  migrations: ['src/db/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
    entitiesDir: 'src/db/entities',
  },
  extra: {
    max: +POOL_MAX_SIZE || 10,
  },
};

export default config;
