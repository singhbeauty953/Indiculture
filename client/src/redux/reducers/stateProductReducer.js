import * as actionTypes from '../constants/stateProductConstant';

export const getStatesProductReducer = (
  state = { productList: [], loading: false, error: null },
  action
) => {
  switch (action.type) {

    case actionTypes.GET_STATESPRODUCTS_SUCCESS:
      return { loading: false, productList: action.payload, error: null };

    case actionTypes.GET_STATESPRODUCTS_FAIL:
      return { loading: false, productList: [], error: action.payload };

    default:
      return state;
  }
};
