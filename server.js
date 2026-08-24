const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const db = require('./mysql');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// ADD BOOK
app.post('/add-book', (req, res) => {

    const { id, title, price, rating } = req.body;

    const sql = `
        INSERT INTO book (id, Title, price, Rating)
        VALUES ($1, $2, $3, $4)
    `;

    db.query(sql, [id, title, price, rating], (err, result) => {

        if (err) {
            console.log("ADD BOOK ERROR:", err);
            return res.status(500).send('Error adding book to database');
        }

        res.send('Book added successfully');
    });
});

// DELETE BOOK
app.post('/delete-book', (req, res) => {

    const id = req.body.id;

    db.query(
        'DELETE FROM book WHERE id = $1',
        [id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).send('Error removing book from database');
            }

            res.send('Book deleted successfully');
        }
    );
});


// SHOW TABLE
app.post('/show-table', (req, res) => {

    db.query('SELECT * FROM book', (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send('Error showing database');
        }

        let table = `
        <!DOCTYPE html>

        <html>
        <head>

            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0">

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

                    body {
                        padding: 15px;
                    }

                    .container {
                        padding: 15px;
                    }

                    table {
                        font-size: 14px;
                    }

                    th,
                    td {
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


        result.rows.forEach(book => {

            table += `
                <tr>
                    <td>#${book.id}</td>
                    <td>📖 ${book.title}</td>
                    <td class="price">₹${book.price}</td>
                    <td class="rating">⭐ ${book.rating}</td>
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


app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
