import finalProductList from './constants/formattedProductList.js';
import StateProduct from './models/stateProduct-schema.js';

const DefaultStateProduct = async () => {
  try {
    await StateProduct.insertMany(finalProductList);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error while inserting data:', error.message);
  }
};

export default DefaultStateProduct;
