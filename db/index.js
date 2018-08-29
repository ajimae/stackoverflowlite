import { Pool } from 'pg';
import databaseConfig from './config';
import dotenv from 'dotenv';

dotenv.config();


//const env = process.env.NODE_ENV;
const env = 'development';

let database;
console.log(databaseConfig);

if (env === 'test') {
  database = new Pool(databaseConfig.test);
} else {
  database = new Pool(databaseConfig.development);
}

export default database;
