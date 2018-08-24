import { Pool } from 'pg';

import databaseConfig from './config';

<<<<<<< HEAD
const env = process.env.NODE_ENV;
=======
//const env = process.env.NODE_ENV;
const env = 'test';
>>>>>>> server

let db;

if (env === 'test') {
  db = new Pool(databaseConfig.test);
} else {
  db = new Pool(databaseConfig.development);
}

export default db;
