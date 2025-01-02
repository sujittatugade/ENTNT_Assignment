import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

const app = express();

// Middleware setup
app.use(cors()); // Allow cross-origin requests from all origins
app.use(bodyParser.json()); // Automatically parse JSON bodies of incoming requests

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',            // Replace with your MySQL username
  password: 'sujit3193',   // Replace with your MySQL password
  database: 'calendar'     // Replace with your MySQL database name
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Connection to MySQL failed:', err.message); // Log connection error if any
    return;
  }
  console.log('Successfully connected to MySQL!'); // Log success message upon successful connection
});

// Basic route to confirm the server is running and connected to MySQL
app.get('/', (req, res) => {
  res.send('Server is up and connected to MySQL');
});

// Login route to validate user credentials
app.post('/login', (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body
  const query = 'SELECT * FROM users WHERE username = ?'; // Query to find user by username
  
  db.execute(query, [username], (err, results) => {
    if (err) {
      console.error('Database query failed:', err); // Log any error during query execution
      return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }

    // If no user is found or the password doesn't match
    if (results.length === 0 || results[0].password !== password) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }

    // Successful login
    return res.status(200).json({ message: 'Login successful' });
  });
});

// Set up server to listen on a specific port
const PORT = process.env.PORT || 4000; // Default to 4000 if no port is specified in environment variables
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
