import * as actionTypes from '../constants/cartConstant';

const initialState = {
  cartItems: [],
  stateItems: {}  // Ensure stateItems is an empty object initially
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            const stateName = item.stateName;  // Assuming the stateName is part of the item payload

            const existItem = state.cartItems.find(product => product.id === item.id);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.id === existItem.id ? item : x)
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    stateItems: {
                        ...state.stateItems,
                        [stateName]: [
                            ...(state.stateItems[stateName] || []),
                            item
                        ]
                    }
                };
            }

        case actionTypes.REMOVE_FROM_CART:
            const itemToRemove = action.payload;
            const stateForRemove = itemToRemove.stateName;  // Get stateName for the item to remove

            return {
                ...state,
                cartItems: state.cartItems.filter(product => product.id !== itemToRemove.id),
                stateItems: {
                    ...state.stateItems,
                    [stateForRemove]: state.stateItems[stateForRemove]?.filter(product => product.id !== itemToRemove.id) || []
                }
            };

        default:
            return state;
    }
};
