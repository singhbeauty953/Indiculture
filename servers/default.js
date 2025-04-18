import { products } from "./constants/data.js"
import product from "./models/product-schema.js";



const DefaultData =async() =>{

   try{
    await product.insertMany(products);

    console.log("Data imported successfully");

   }catch(error){
    console.log("Error while inserting data",error.message);
   }
   

   
}

export default DefaultData;