import dotEnv from 'dotenv';

dotEnv.config();

const databaseConfig = {};

databaseConfig.development = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

databaseConfig.test = {
  //connectionString: process.env.stackoverflow,
  connectionString: 'postgresql://root:123@localhost:5432/stackoverflowlite',
};

databaseConfig.secret = process.env.SECRET;
console.log(databaseConfig.secret);

export default databaseConfig;
