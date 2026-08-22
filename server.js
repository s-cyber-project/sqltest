const express=require('express');
const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json());
const path=require('path');
const db=require('./mysql');
const port=process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});
app.post('/add-book',(req,res)=>{
    const title=req.body.title;
    const price=req.body.price;
    const rating=req.body.rating;
    db.query("INSERT INTO book (title, price, rating) VALUES (?, ?, ?)",[title,price,rating],(err,result)=>{
        if(err){
            res.status(500).send('Error adding book to database');
        }else{
            res.send('Book added successfully');
        }
    });
});

app.post('/delete-book',(req,res)=>{
    const id=req.body.id;
    db.query("DELETE FROM book where id=?",[id],(err,result)=>{
        if(err){
            res.status(500).send('Error removing book from database');
        }else{
            res.send('Book deleted successfully');
        }
    });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});