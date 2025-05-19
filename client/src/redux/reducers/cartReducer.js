import * as actionTypes from '../constants/cartConstant';

const initialState = {
    cartItems: [],
    stateItems: {}  // Categorized by stateName
  };
  
  export const cartReducer = (state = initialState, action) => {
      switch (action.type) {
          case actionTypes.ADD_TO_CART:
              const item = action.payload;
              const stateName = item.stateName || 'home'; // default for non-state items
  
              const existItem = state.cartItems.find(product => product.id === item.id);
  
              if (existItem) {
                  return {
                      ...state,
                      cartItems: state.cartItems.map(x => x.id === existItem.id ? item : x),
                      stateItems: {
                          ...state.stateItems,
                          [stateName]: state.stateItems[stateName]?.map(x => x.id === existItem.id ? item : x)
                      }
                  };
              } else {
                  return {
                      ...state,
                      cartItems: [...state.cartItems, item],
                      stateItems: {
                          ...state.stateItems,
                          [stateName]: [...(state.stateItems[stateName] || []), item]
                      }
                  };
              }
  
          case actionTypes.REMOVE_FROM_CART:
              const itemToRemove = action.payload;
              const removeState = itemToRemove.stateName || 'home';
  
              return {
                  ...state,
                  cartItems: state.cartItems.filter(product => product.id !== itemToRemove.id),
                  stateItems: {
                      ...state.stateItems,
                      [removeState]: state.stateItems[removeState]?.filter(product => product.id !== itemToRemove.id) || []
                  }
              };
  
          default:
              return state;
      }
  };
  