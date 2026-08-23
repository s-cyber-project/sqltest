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
    const id=req.body.id;
    const title=req.body.title;
    const price=req.body.price;
    const rating=req.body.rating;
    db.query("INSERT INTO book (id, title, price, rating) VALUES (?, ?, ?, ?)",[id,title,price,rating],(err,result)=>{
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
app.post("/show-table", (req, res) => {
    db.query("SELECT * FROM book", (err, result) => {

        if (err) {
            return res.status(500).send("Error showing database");
        }

        let table = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Book Library</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #f4f6ff;
                    padding: 40px;
                }

                .container {
                    max-width: 900px;
                    margin: auto;
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                }

                h1 {
                    text-align: center;
                    color: #667eea;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 25px;
                }

                th {
                    background: #667eea;
                    color: white;
                    padding: 15px;
                    text-align: left;
                }

                td {
                    padding: 14px;
                    border-bottom: 1px solid #eee;
                }

                tr:hover {
                    background: #f5f7ff;
                }

                .price {
                    color: #16a34a;
                    font-weight: bold;
                }

                .rating {
                    color: #ea580c;
                    font-weight: bold;
                }

                @media (max-width: 600px) {
                    .container {
                        padding: 15px;
                    }

                    table {
                        font-size: 14px;
                    }

                    th, td {
                        padding: 10px;
                    }
                }
            </style>
        </head>

        <body>

        <div class="container">

            <h1>📚 Book Library</h1>

            <table>

                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Rating</th>
                </tr>
        `;

        result.forEach(book => {

            table += `
                <tr>
                    <td>#${book.id}</td>
                    <td>📖 ${book.Title}</td>
                    <td class="price">₹${book.price}</td>
                    <td class="rating">⭐ ${book.Rating}</td>
                </tr>
            `;
        });

        table += `
            </table>

        </div>

        </body>
        </html>
        `;

        res.send(table);
    });
});
app.listen(port,'0.0.0.0',()=>{
    console.log(`Server is running on port ${port}`);
});
