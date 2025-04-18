import axios from 'axios';
import * as actionTypes from '../constants/stateConstant';

const URL = 'http://localhost:8000';

export const getStates = () => async (dispatch) => {
 

  try {
    const { data } = await axios.get(`${URL}/statesData`);
    
    // Dispatch GET_STATES_SUCCESS with the data when request is successful
    dispatch({ type: actionTypes.GET_STATES_SUCCESS, payload: data });
  } catch (error) {
    // Dispatch GET_STATES_FAIL with the error message when the request fails
    dispatch({
      type: actionTypes.GET_STATES_FAIL,
      payload: error.message || 'Something went wrong',
    });
  }
};
