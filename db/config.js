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
  connectionString: 'postgresql://root:123@localhost:5432/stackoverflowlite',
};


export default databaseConfig;
