import { Pool } from 'pg';

import databaseConfig from './config';

//const env = process.env.NODE_ENV;
const env = 'test';

let database;

if (env === 'test') {
  database = new Pool(databaseConfig.test);
} else {
  database = new Pool(databaseConfig.development);
}

export default database;
