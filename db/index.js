import { Pool } from 'pg';
import databaseConfig from './config';
import dotenv from 'dotenv';

dotenv.config();


const env = process.env.NODE_ENV;
//const env = 'test';

let database;

if (env === 'test') {
  database = new Pool(databaseConfig.test);
} else {
  database = new Pool(databaseConfig.development);
}

export default database;
