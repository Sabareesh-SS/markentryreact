const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());


const mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', 
    password: 'sabareeshnoob', 
    database: 'student', 
});


mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database.');
    }
}); 

app.post('/api/register', (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required!' });
    }

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    mysqlConnection.query(query, [email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});