import { bihar, maharashtra } from './StateProducts.js';

const transformProduct = (products, stateName) => {
  return products.map((product, index) => {
    const cost = product.price;
    const mrp = Math.round(cost * 1.25);
    const discount = `${Math.round(((mrp - cost) / mrp) * 100)}% off`;

    return {
      id: `${stateName}${index + 1}`, // unique string id
      url: product.image,
      detailUrl: product.image,
      title: {
        shortTitle: product.name,
        longTitle: `${product.name} from ${stateName.charAt(0).toUpperCase() + stateName.slice(1)}`
      },
      price: {
        mrp,
        cost,
        discount
      },
      quantity: 1,
      description: product.description,
      discount,
      tagline: `Cultural Special of ${stateName}`,
      state: stateName
    };
  });
};

// Combine and export
const finalProductList = [
  ...transformProduct(bihar, 'bihar'),
  ...transformProduct(maharashtra, 'maharashtra'),
 

];

export default finalProductList;
