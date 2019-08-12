import axios from 'axios';
import {
  FETCH_MEAL_ORDERS_SUCCESS,
  FETCH_MEAL_ORDERS_FAILURE,
  FETCH_MEAL_ORDERS_LOADING,
  PAGINATION_CHANGE
} from '../actionTypes';

export const fecthOrdersLoading = (isLoading) => ({
  type: FETCH_MEAL_ORDERS_LOADING,
  payload: isLoading,

});

export const fecthOrdersSuccess = orders => ({
  type: FETCH_MEAL_ORDERS_SUCCESS,
  payload: orders,
});

export const fecthOrdersFailure = error => ({
  type: FETCH_MEAL_ORDERS_FAILURE,
  payload: error,
});

export const fetchOrders = (currentPage = '',
  startDate = '', endDate = '') => dispatch => {
  dispatch(fecthOrdersLoading(true));

  let url;

  if (!startDate || !endDate) {
    url = `/orders/?page=${currentPage}&per_page=15`;
  } else {
    url = `/orders/${startDate}/${endDate}?page=${currentPage}&per_page=15`;
  }

  return axios.get(url)
    .then((response) => {
      dispatch(fecthOrdersSuccess(response.data.payload));
      dispatch(fecthOrdersLoading(false));
    })
    .catch((error) => {
      if (error.response.status === 400) {
        document.cookie = `jwt-token=; expires=Tue, 20 Nov 2018 13:21:57 GMT; `
          + `Path=/; Domain=.andela.com`;
      }
      dispatch(fecthOrdersFailure(error));
      dispatch(fecthOrdersLoading(false));
    });
};


export const handlePaginationChange = currentPage => ({
  type: PAGINATION_CHANGE,
  payload: currentPage
});
