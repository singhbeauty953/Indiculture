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
//import Layout from './components/Layout';

function App() {
  return (
    <Dataprovider>
      <BrowserRouter>
 
          <Header />
          <Box style={{ marginTop: 54 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product/:id' element={<Details />} />
              <Route path='/State' element={<State />} />
              <Route path="/" element={<StateList />} />
              <Route path="/StateNav/:stateName" element={<StateNav />} />
              <Route path= '/cart' element={<Cart />} />

            </Routes>
          </Box>
    
      </BrowserRouter>
    </Dataprovider>
  );
}

export default App;
