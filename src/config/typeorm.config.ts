import { registerAs } from '@nestjs/config';
import { join } from 'node:path';

const ConnectionDatabaseType = {
  postgres: 'postgres',
};

export const entitiesDir = join(
  __dirname,
  '..',
  '..',
  'dist',
  '**',
  '*.entity{.ts,.js}',
);

export default registerAs('database', () => ({
  type: ConnectionDatabaseType[process.env.DATABASE_TYPE],
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  port: +process.env.DATABASE_PORT,
}));
