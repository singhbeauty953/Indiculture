import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

// Assuming state-specific products are available in productList
import productList from '../../Constant/stateProducts'; // Make sure to import the state-specific products

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 78%;
  background-color: #fff;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const Search = () => {
    const [text, setText] = useState('');
    const [debouncedText, setDebouncedText] = useState('');
    const [open, setOpen] = useState(true); // Used for showing/hiding list

    const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    // Handle input change
    const handleInputChange = (e) => {
        setText(e.target.value);
        setOpen(false);
    };

    // Debounce search text update
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedText(text);
        }, 500); // 500ms debounce delay

        return () => clearTimeout(timer); // Cleanup
    }, [text]);

    return (
        <SearchContainer>
            <InputSearchBase
              placeholder="Search for products, brands and more"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleInputChange}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            {debouncedText && (
              <ListWrapper visible={debouncedText && !open}>
                {
                  // Combine and filter both state-specific and normal products
                  [
                    ...products, // Normal products from Redux
                    ...Object.keys(productList).flatMap((state) => 
                      productList[state].map((product) => ({
                        ...product,
                        state
                      }))
                    ) // State-specific products from productList
                  ]
                    .filter(product =>
                      // Filter by name or description (for both product types)
                      (product.name && product.name.toLowerCase().includes(debouncedText.toLowerCase())) ||
                      (product.description && product.description.toLowerCase().includes(debouncedText.toLowerCase()))
                    )
                    .map(product => (
                      <ListItem key={product.id}>
                        <Link 
                          to={`/product/${product.id}`} 
                          style={{ textDecoration:'none', color:'inherit'}}
                          onClick={() => setOpen(true)}
                        >
                          {product.name} - {product.price.mrp} INR 
                          (Cost: {product.price.cost} INR, Discount: {product.price.discount}%)
                          {product.state ? ` - State: ${product.state}` : ''} {/* Show state if available */}
                        </Link>
                      </ListItem>
                    ))
                }
              </ListWrapper>
            )}
        </SearchContainer>
    );
}

export default Search;
