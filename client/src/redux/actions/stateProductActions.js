import axios from 'axios';  // Ensure axios is imported
import * as actionTypes from '../constants/stateProductConstant';  // Ensure actionTypes is imported correctly

const URL = 'http://localhost:8000';

export const getStatesProducts = (state) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/stateProducts?state=${state}`);

    dispatch({
      type: actionTypes.GET_STATESPRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_STATESPRODUCTS_FAIL,
      payload: error.message || 'Something went wrong',
    });
  }
};
