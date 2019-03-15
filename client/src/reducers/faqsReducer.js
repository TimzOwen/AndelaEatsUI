import {
  FETCH_FAQS_LOADING,
  FETCH_FAQS_SUCCESS,
  FETCH_FAQS_FAILURE,
  CREATE_FAQ_LOADING,
  CREATE_FAQ_SUCCESS,
  CREATE_FAQ_FAILURE,
  DELETE_FAQ_SUCCESS,
  DELETE_FAQ_FAILURE,
  DELETE_FAQ_LOADING,
  UPDATE_FAQ_SUCCESS,
  UPDATE_FAQ_FAILURE,
  UPDATE_FAQ_LOADING
} from '../actions/actionTypes';
import filter from '../helpers/filter';
import findIndex from '../helpers/findindex';

import { initialFaqs } from './initialState';

let index;

const faqsReducer = (state = initialFaqs, action) => {
  switch (action.type) {
    case FETCH_FAQS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_FAQS_SUCCESS:
      return { ...state, faqs: action.payload };
    case CREATE_FAQ_LOADING:
      return { ...state, isCreating: action.payload };
    case CREATE_FAQ_SUCCESS:
      return { ...state, faqs: [...state.faqs, action.payload] };
    case DELETE_FAQ_LOADING:
      return { ...state, isDeleting: action.payload };
    case DELETE_FAQ_SUCCESS:
      return {
        ...state,
        faqs: filter(state.faqs, action.payload)
      };
    case UPDATE_FAQ_SUCCESS:
      index = findIndex(state.faqs, action.payload.id);
      return {
        ...state,
        faqs: [
          ...state.faqs.slice(0, index),
          action.payload, 
          ...state.faqs.slice(index + 1)
        ]
      };
    case UPDATE_FAQ_LOADING:
      return { ...state, isUpdating: action.payload };
    case FETCH_FAQS_FAILURE:
    case CREATE_FAQ_FAILURE:
    case DELETE_FAQ_FAILURE:
    case UPDATE_FAQ_FAILURE:
      return state;
    default:
      return state;
  }
};
export default faqsReducer;
