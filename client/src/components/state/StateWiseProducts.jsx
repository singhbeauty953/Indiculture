import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStatesProducts } from '../../redux/actions/stateProductActions';

export const getStatesProducts = (state) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/stateProducts?state=${state}`);

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

