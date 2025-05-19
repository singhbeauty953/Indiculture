import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import DefaultData from './default.js';
import DefaultStateData from './defaultState.js';
import DefaultStateProduct from './defaultStateProduct.js';
import Router from './routes/route.js';

const app = express();

// Load environment variables
dotenv.config();

// Configure CORS (if needed, configure it to allow specific origins)
app.use(cors());

// Use express' built-in body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/', Router);

// Dynamic port and DB connection
const port = process.env.PORT || 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Connect to the database
const connectDB = async () => {
  try {
    await Connection(USERNAME, PASSWORD);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit if connection fails
  }
};

// Initialize default data
const initializeData = async () => {
  try {
    await DefaultData();
    await DefaultStateData();
    await DefaultStateProduct();
  } catch (error) {
    console.error('Error initializing default data:', error.message);
  }
};

// Start server
const startServer = () => {
  app.listen(port, (err) => {
    if (err) {
      console.error('Error starting the server:', err.message);
      process.exit(1);
    }
    console.log(`Server is running on https://indiculture.onrender.com:${port}`);
  });
};

// Initialize app with database connection and data
const initializeApp = async () => {
  await connectDB();
  await initializeData();
  startServer();
};

// Paytm Payment params (ensure they are correctly set in .env)
export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {
  'MID': process.env.PAYTM_MID,
  'WEBSITE': process.env.PAYTM_WEBSITE,
  'CHANNEL_ID': process.env.PAYTM_CHANNEL_ID,
  'INDUSTRY_TYPE_ID': process.env.PAYTM_INDUSTRY_TYPE_ID,
  'ORDER_ID': uuid(),
  'CUST_ID': process.env.PAYTM_CUSTOMER_ID,
  'TXN_AMOUNT': '100',
  'CALLBACK_URL': 'https://indiculture.onrender.com/callback',
  'EMAIL': 'kunaltyagi@gmail.com',
  'MOBILE_NO': '1234567852',
};

// Start the application
initializeApp();
