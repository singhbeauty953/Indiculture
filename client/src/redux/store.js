import { createStore, combineReducers, applyMiddleware ,compose} from 'redux';
import {thunk} from 'redux-thunk'; // ✅ Corrected import
//import { composeWithDevTools } from 'redux-devtools-extension'; // ✅ Corrected usage

import { getProductsReducer, getProductDetailsReducer,} from './reducers/productReducer';
import { getStatesReducer } from './reducers/stateReducer';
import { getStatesProductReducer } from './reducers/stateProductReducer';
import { cartReducer } from './reducers/cartReducer';




//import { getStates } from '../../../servers/controller/StateControler';

const reducer = combineReducers({
    cart: cartReducer,
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    getStates: getStatesReducer,
    getStatesProducts: getStatesProductReducer
});

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
