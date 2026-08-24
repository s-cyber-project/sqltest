const Pool = require('pg');

const db = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
});
db.getConnection((err, connection)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Database connected');
    }
});
module.exports=db;

