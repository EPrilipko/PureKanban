import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
import { config } from 'dotenv';

import { entities } from './entities.generated';
import { resolve } from 'path';

config();

const getOrThrow = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing env variable ${name}`);
  }

  return value;
};

export default defineConfig({
  driver: PostgreSqlDriver,
  dbName: getOrThrow('DB_NAME'),
  host: getOrThrow('DB_HOST'),
  port: Number(getOrThrow('DB_PORT')),
  user: getOrThrow('DB_USER'),
  password: getOrThrow('DB_PASS'),
  schema: getOrThrow('DB_SCHEMA'),

  entities,
  extensions: [Migrator, EntityGenerator, SeedManager],

  migrations: {
    path: resolve(__dirname, 'migrations'),
    pathTs: resolve(__dirname, 'migrations'),
    glob: '!(*.d).{js,ts}',
    snapshot: false,
  },

  seeder: {
    path: resolve(__dirname, 'seeders'),
    pathTs: resolve(__dirname, 'seeders'),
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
  },
});
