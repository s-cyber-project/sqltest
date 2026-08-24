const { Pool } = require('pg');

const db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
db.query('SELECT * FROM book')
    .then(result => {
        console.log('DATABASE CONNECTED');
        console.log(result.rows);
    })
    .catch(err => {
        console.log('DATABASE ERROR:');
        console.log(err);
    });
module.exports = db;
