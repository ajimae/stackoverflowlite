import dotEnv from 'dotenv';

dotEnv.config();

const databaseConfig = {};

databaseConfig.development = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.SSL,
};


// databaseConfig.development = {
//     //connectionString: process.env.STACK_LITE,
//     databaseConfig: "postgres://mlnbloqjrdgbiz:0f2522ad45392f1afb072f2d1edab52d07fb6bdca24602bdde3b0ff64f0f3ad7@ec2-54-243-216-33.compute-1.amazonaws.com:5432/dbt5gu8kib8g1b"
// };


export default databaseConfig;
