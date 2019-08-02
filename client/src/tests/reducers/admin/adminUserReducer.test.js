/* eslint-disable no-undef */
import { initialUser } from "../../../reducers/initialState";
import adminUserReducer from "../../../reducers/admin/adminUserReducer";
import { roles, newRole, newPermision } from '../../__mocks__/mockRoles';

import {
  ADD_ADMIN_USER_FAILURE,
  ADD_ADMIN_USER_SUCCESS,
  GET_ADMIN_USER,
  GET_ALL_ADMIN_USERS,
  IS_FETCHING_ADMIN_USERS,
  FETCH_USERS_ROLES,
  ADD_USER_ROLE_SUCCESS,
  ADD_USER_ROLE_FAILURE,
  EDIT_USER_ROLE_SUCCESS,
  DELETE_USER_ROLE_SUCCESS,
  DELETE_USER_PERMISION_SUCCESS,
  ADD_USER_PERMISION_SUCCESS,
  FETCH_USER_PERMISION_SUCCESS,
  FETCH_ALL_PERMISIONS,
  IS_FETCHING_ROLE_PERMISION,
  IS_FETCHING_ROLES,
  DELETE_ADMIN_FAILURE,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_LOADING
} from "../../../actions/actionTypes";

describe('Admin User Reducer', () => {
  it('should update role', () => {
    const action = {
      type: GET_ADMIN_USER,
      payload: 1
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.role).toEqual(action.payload);
  });

  it('should update admin users', () => {
    const action = {
      type: GET_ALL_ADMIN_USERS,
      payload: ['1', '2']
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.adminUsers).toEqual(action.payload);
  });

  it('should update message', () => {
    const action = {
      type: ADD_ADMIN_USER_SUCCESS,
      message: ""
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.message).toEqual(action.message);
  });

  it('should update error', () => {
    const action = {
      type: ADD_ADMIN_USER_FAILURE,
      message: "successfully done"
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.error).toEqual(action.message);
  });

  it('should show loading status', () => {
    const action = {
      type: IS_FETCHING_ADMIN_USERS,
      payload: false
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.loading).toEqual(action.payload);
  });
  it('should update the roles state in the store', () => {
    const action = {
      type: FETCH_USERS_ROLES,
      payload: roles
    };

    const newState = adminUserReducer(initialUser, action);
    expect(newState.roles).toEqual(roles);
  });

  it('should update role in the store', () => {
    const action = {
      type: ADD_USER_ROLE_SUCCESS,
      payload: newRole,
    };
    
    const newState = adminUserReducer(initialUser, action);
    expect(newState.roles).toEqual([newRole]);
  });

  it('should update error', () => {
    const action = {
      type: ADD_USER_ROLE_FAILURE,
      message: "Access Denied",
    };

    const newState = adminUserReducer(initialUser, action);
    expect(newState.error).toEqual(action.message);
  });

  it('should set state of roles when editing a role', () => {
    const action = {
      type: EDIT_USER_ROLE_SUCCESS,
      payload: { id: 1, name: 'Admin' },
    };
    
    const newState = adminUserReducer(
      {
        ...initialUser,
        roles: [
          { id: 1, name: 'admin' }, { id: 2, name: 'admin' }
        ] 
      },
      action);
    expect(newState.roles[0].name).toEqual('Admin');
  });

  it('should return the previous state', () => {
    const action = {
      type: DELETE_USER_ROLE_SUCCESS,
      payload: {},
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.roles).toEqual([]);
  });

  it('should return the previous state', () => {
    const action = {
      type: DELETE_USER_PERMISION_SUCCESS,
      payload: {},
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.roles).toEqual([]);
  });

  it('should change the state of permisions', () => {
    const action = {
      type: ADD_USER_PERMISION_SUCCESS,
      payload: {},
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.permisions).toEqual([{}]);
  });

  it('should fetch user permissions', () => {
    const action = {
      type: FETCH_USER_PERMISION_SUCCESS,
      payload: [{ id: 1 }],
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.permisions.length).toEqual(1);
  });

  it('should fetch all permissions', () => {
    const action = {
      type: FETCH_ALL_PERMISIONS,
      payload: [{ id: 1 }],
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.all_permisions.length).toEqual(1);
  });

  it('should set IS_FETCHING_ROLE_PERMISION', () => {
    const action = {
      type: IS_FETCHING_ROLE_PERMISION,
      payload: true,
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.loading_permisions).toEqual(true);
  });

  it('should set IS_FETCHING_ROLES', () => {
    const action = {
      type: IS_FETCHING_ROLES,
      payload: true,
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.loading_roles).toEqual(true);
  });

  it('should revoke admin role for a user', () => {
    const action = {
      type: DELETE_ADMIN_SUCCESS,
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.error.status).toEqual(false);
  });

  it('should set isDeleting to true', () => {
    const action = {
      type: DELETE_ADMIN_LOADING,
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState).toEqual(newState);
  });
});
