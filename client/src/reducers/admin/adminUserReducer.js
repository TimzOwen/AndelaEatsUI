import {
  GET_ADMIN_USER,
  GET_ALL_ADMIN_USERS,
  ADD_ADMIN_USER_SUCCESS,
  ADD_ADMIN_USER_FAILURE,
  IS_FETCHING_ROLE_PERMISION,
  IS_FETCHING_ADMIN_USERS,
  FETCH_USERS_ROLES,
  ADD_USER_ROLE_SUCCESS,
  ADD_USER_ROLE_FAILURE,
  DELETE_USER_ROLE_SUCCESS,
  EDIT_USER_ROLE_SUCCESS,
  ADD_USER_PERMISION_SUCCESS,
  DELETE_USER_PERMISION_SUCCESS,
  FETCH_USER_PERMISION_SUCCESS,
  IS_FETCHING_ROLES,
  FETCH_ALL_PERMISIONS,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_LOADING
} from "../../actions/actionTypes";
import { initialUser } from '../initialState';
import filter from '../../helpers/filter';

const adminUserReducer = (state = initialUser, action) => {
  switch (action.type) {
    case GET_ADMIN_USER:
      return { ...state, role: action.payload };
    case GET_ALL_ADMIN_USERS:
      return {
        ...state,
        adminUsers: action.payload 
      };
    case ADD_ADMIN_USER_SUCCESS:
      return {
        ...state,
        adminUsers: [action.payload, ...state.adminUsers],
      };
    case ADD_ADMIN_USER_FAILURE:
      return {
        ...state,
        error: action.message
      };
    case FETCH_USERS_ROLES:
      return {
        ...state,
        roles: action.payload
      };
    case FETCH_USER_PERMISION_SUCCESS:
      return { 
        ...state,
        permisions: action.payload,
      };
    case FETCH_ALL_PERMISIONS:
      return { 
        ...state,
        all_permisions: action.payload,
      };
    case ADD_USER_ROLE_SUCCESS:
      return {
        ...state,
        roles: [...state.roles, action.payload],
      };
    case ADD_USER_ROLE_FAILURE:
      return {
        ...state,
        error: action.message
      };
    case ADD_USER_PERMISION_SUCCESS:
      return {
        ...state,
        permisions: [...state.permisions, action.payload]
      };
    case EDIT_USER_ROLE_SUCCESS:
      return {
        ...state,
        roles: state.roles
          .map(role => (role.id === action.payload.id ? action.payload : role)),
        message: action.payload
      };
    case DELETE_USER_ROLE_SUCCESS:
      return {
        ...state,
        roles: filter(state.roles, action.payload)
      };
    case DELETE_USER_PERMISION_SUCCESS:
      return {
        ...state,
        permisions: filter(state.permisions, action.payload)
      };
    case IS_FETCHING_ROLE_PERMISION:
      return {
        ...state,
        loading_permisions: action.payload
      };
    case IS_FETCHING_ROLES:
      return {
        ...state,
        loading_roles: action.payload
      };
    case IS_FETCHING_ADMIN_USERS:
      return {
        ...state,
        isloading: action.payload
      };
    case DELETE_ADMIN_LOADING:
      return { ...state, isDeleting: action.payload };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminUserReducer;
