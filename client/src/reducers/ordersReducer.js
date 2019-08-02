import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_LOADING,
  FETCH_FILTERED_ORDERS,
  DELETE_ORDER_LOADING,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  EDIT_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  GET_ORDER_SUCCESS,
  CREATE_MENU_RATING_SUCCESS,
  CREATE_MENU_RATING_LOADING,
  CREATE_MENU_RATING_FAILURE
} from '../actions/actionTypes';

import filter from '../helpers/filter';

import { orders } from './initialState';

export default (state = orders, action) => {
  switch (action.type) {
    case FETCH_ORDERS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state, ...action.orders, isFiltered: false, error: ''
      };
    case FETCH_ORDERS_FAILURE:
      return { ...state, error: action.error };
    case FETCH_FILTERED_ORDERS:
      return {
        ...state, ...action.orders, isFiltered: true, error: ''
      };
    case DELETE_ORDER_LOADING:
      return { ...state, isDeleting: action.payload };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        totalRecords: state.totalRecords - 1,
        orders: state.orders.filter(order => order.id !== action.payload)
      };
    case EDIT_ORDER_SUCCESS:
      return {
        ...state,
        menu: action.payload
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map(
          order => ((order.id === action.payload.id) ? action.payload : order))
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        menu: action.order
      };
    case DELETE_ORDER_FAILURE:
      return state;
    case CREATE_MENU_RATING_SUCCESS:
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.id === action.payload.typeId) {
            order = {
              ...order,
              hasRated: true,
              user_rating: action.payload.rating
            };
          }
          return order;
        }),
        isLoading: false
      };
    case CREATE_MENU_RATING_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_MENU_RATING_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
