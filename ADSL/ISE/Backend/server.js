// server.js
const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'kedar',
  password: 'kedar123',
  database: 'adslab',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
    createTableIfNotExists();
  }
});

// Create the 'files' table if not exists
function createTableIfNotExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      file_data MEDIUMBLOB NOT NULL
    );
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created or already exists');
    }
  });
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for image upload
app.post('/upload', upload.single('image'), (req, res) => {
  const image = req.file.buffer;

  const sql = 'INSERT INTO files (file_data) VALUES (?)';
  connection.query(sql, [image], (err, results) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Image uploaded successfully!');
      res.json({ message: 'Image uploaded successfully!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
