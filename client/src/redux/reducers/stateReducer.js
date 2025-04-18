import * as actionTypes from '../constants/stateConstant';

export const getStatesReducer = (state = { states: [], loading: true, error: null }, action) => {
  switch (action.type) {
   
    case actionTypes.GET_STATES_SUCCESS:
      return { loading: false, states: action.payload, error: null }; // Set loading to false, and update states on success

    case actionTypes.GET_STATES_FAIL:
      return { loading: false, states: [], error: action.payload }; // Set loading to false and show error message on failure

    default:
      return state;
  }
};
