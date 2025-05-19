import * as actionTypes from '../../redux/constants/cartConstant.js';
import axios from 'axios';

export const addToCart = (id, quantity, stateName) => async (dispatch) => {
    try {
        const { data } = await axios.get(`https://indiculture.onrender.com/product/${id}`);
        
        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: { ...data, quantity, stateName }
        });

    } catch (error) {
        console.log('Error while calling cart API');
    }
};

export const removeFromCart = (id, stateName) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: { id, stateName }
    });
};
