const express = require('express');
const pool = require('./db');
const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Express!!');
});

app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, data) => {
        if(err) return res.send(err);
        return res.json(data.rows);
    })
})

app.listen(PORT, () => {
    console.log('connected to server successfully!')
});