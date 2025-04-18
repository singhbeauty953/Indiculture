import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import DefaultData from './default.js';
import Router from './routes/route.js';
import DefaultStateData from './defaultState.js';
import DefaultStateProduct from './defaultStateProduct.js';


const app = express();

// Load environment variables
dotenv.config();
app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

// Routes
app.use('/', Router);

// Dynamic port
const port = process.env.PORT || 8000;

// Database connection
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD).catch(err => {
  console.error('Database connection failed:', err.message);
  process.exit(1); // Exit the app if the database connection fails
});

// Default data initialization
try {
  DefaultData();
} catch (error) {
  console.error('Error initializing default data:', error.message);
}

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome');
});

// Start server
app.listen(port, err => {
  if (err) {
    console.error('Error starting the server:', err.message);
    process.exit(1);
  }
  console.log(`Server is running on http://localhost:${port}`);
});

DefaultStateData();
DefaultStateProduct();