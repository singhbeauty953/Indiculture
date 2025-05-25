// App.js
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import { Box } from '@mui/material';
import Dataprovider from './context/Dataprovider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './components/details/Details';
import State from './components/state/State';
import StateList from './components/state/StateList';
import StateNav from './components/state/StateNav';
import Cart from './components/cart/Cart';
import StateproductsDetails from './components/details/StateproductsDetails';
import productList from './Constant/stateProducts';
import { useEffect, useState } from 'react';
import StateCart from './components/state/StateCart';
import BuyNow from './components/state/BuyNow';

function App() {
  const [productId, setProductId] = useState('');
  const [cartAllProduct, setCartAllProduct] = useState([]);

  // When productId changes, add that product to cart
  useEffect(() => {
    if (!productId) return;
    const allProducts = Object.values(productList).flat();
    const filteredProduct = allProducts.find((product) => product.id === productId);
    if (filteredProduct) {
      setCartAllProduct((prev) => {
        // If product already in cart, increase count
        const existing = prev.find((p) => p.id === productId);
        if (existing) {
          return prev.map((p) =>
            p.id === productId ? { ...p, count: (p.count || 1) + 1 } : p
          );
        } else {
          return [...prev, { ...filteredProduct, count: 1 }];
        }
      });
    }
  }, [productId]);

  return (
    <Dataprovider>
      <BrowserRouter>
        {/* Pass cart state & setter as props */}
        <Header cartAllProduct={cartAllProduct} setCartAllProduct={setCartAllProduct} />
        <Box style={{ marginTop: 54 }}>
          <Routes>
            <Route path="/" element={<Home setProductId={setProductId} />} />
            <Route path="/product/:id" element={<Details />} />
            <Route
              path="/stateproduct/:productId"
              element={<StateproductsDetails setProductId={setProductId} />}
            />
            <Route path="/State" element={<State />} />
            <Route path="/states" element={<StateList />} />
            <Route path="/StateNav/:stateName" element={<StateNav />} />
            <Route
              path="/StateCart"
              element={
                <StateCart
                  cartAllProduct={cartAllProduct}
                  setCartAllProduct={setCartAllProduct}
                />
              }
            />
            <Route path="/checkout" element={<BuyNow />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Dataprovider>
  );
}

export default App;
