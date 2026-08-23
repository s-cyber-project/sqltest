const sql=require('mysql2');
const db=sql.createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE || 3000
});
db.getConnection((err, connection)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Database connected');
    }
});
module.exports=db;

