
import { request, response } from 'express';
import product from '../models/product-schema.js'

export const getProducts= async(request, response)=>{
    try {
       const products= await product.find({})

       response.status(200).json(products);
        
    } catch (error) {
        response.status(500).json({message: error.message});
        
    }

}
export const getProductById= async (request, response)=>{
    try {
       
        const products= await product.findOne({ 'id': request.params.id })
        response.status(200).json(products);

    } catch (error) {
        
        response.status(500).json({message: error.message});

    }
}