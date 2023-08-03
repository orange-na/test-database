const express = require('express');
const pool = require('./db');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'https://test-database-xijq.onrender.com',
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello Express!!');
});

app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, data) => {
        if(err) return res.send(err);
        return res.json(data.rows);
    })
})

app.post('/api', (req, res) => {
    pool.query('INSERT INTO users(`username`) VALUES (?)', [req.body.username],(err, data) => {
        if(err) return res.send(err);
        return res.json('username has been created successfully!')
    })
})

app.listen(process.env.PORT || 8800, () => {
    console.log('connected to server successfully!')
});