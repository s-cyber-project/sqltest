const sql=require('mysql2');
const db=sql.createPool({
    host: "localhost",
    user: "root",
    password: "3223",
    database:"project"
});
db.getConnection((err, connection)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Database connected');
    }
});
module.exports=db;

