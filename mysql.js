const sql=require('mysql2');
const db=sql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3000
});
db.getConnection((err, connection)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Database connected');
    }
});
module.exports=db;

