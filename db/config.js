import dotEnv from 'dotenv';

dotEnv.config();

//const databaseConfig = {};



// databaseConfig.development = {
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   ssl: process.env.SSL,
// };


databaseConfig.test = {
    //connectionString: process.env.STACK_LITE,
    connectionString: "postgres://vrjrvrqtonfhsz:a4059234548ff1d35017bf2e8c8847ba14b17d4431a352a8d98c20ba30a6f6d9@ec2-54-225-92-1.compute-1.amazonaws.com:5432/d4qf60h3u2r1bh"
};


export default databaseConfig;
