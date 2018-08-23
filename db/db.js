//import pg from 'pg';
const pg = require('pg');

const connectionString = process.env.DATABASE_URL || "connectionString: 'postgresql://postgres:1234@localhost:5432/postgres";
//const connectionString = 'postgres://vrjrvrqtonfhsz:a4059234548ff1d35017bf2e8c8847ba14b17d4431a352a8d98c20ba30a6f6d9@ec2-54-225-92-1.compute-1.amazonaws.com:5432/d4qf60h3u2r1bh?ssl=true';

const client = new pg.Client(connectionString);
client.connect();
let query = client.query("CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN");
console.log(query);
//query.on('end', function(){client.end();});

// pg.Client(connectionString, function(err, client, done) {
//     client.query("CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN");
//         //client.query('SELECT * FROM your_table', function(err, result) {
//        done();
//        if(err) return console.error(err);
//        console.log(result.rows);
//     //});
//  });