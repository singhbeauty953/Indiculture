import express from 'express';
import { userSignup, userLogin } from '../controller/user-controller.js'; 
import { getProducts, getProductById } from '../controller/product-controller.js';
import { getStates } from '../controller/StateControler.js';
import { getStateProducts } from '../controller/stateProduct-Controller.js';

const router = express.Router();

// Define the signup and login routes correctly
router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.get('/statesData',getStates);
router.get('/stateProducts', getStateProducts);  

export default router;

