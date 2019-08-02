import axios from "axios";
import { toast } from 'react-toastify';
import { toastSuccess, toastError } from '../../helpers/toast';
import token from '../../helpers/jwtDecode';

import {
  GET_ADMIN_USER,
  GET_ALL_ADMIN_USERS,
  ADD_ADMIN_USER_SUCCESS,
  ADD_ADMIN_USER_FAILURE,
  IS_FETCHING_ADMIN_USERS,
  FETCH_USERS_ROLES,
  ADD_USER_ROLE_SUCCESS,
  ADD_USER_ROLE_FAILURE,
  DELETE_USER_ROLE_SUCCESS,
  EDIT_USER_ROLE_SUCCESS,
  DELETE_USER_PERMISION_SUCCESS,
  ADD_USER_PERMISION_SUCCESS,
  FETCH_USER_PERMISION_SUCCESS,
  IS_FETCHING_ROLE_PERMISION,
  IS_FETCHING_ROLES,
  FETCH_ALL_PERMISIONS,
  GET_TAPPED_USERS_SUCCESS,
  GET_TAPPED_USERS_FAILURE,
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADING,
  FETCH_USERS_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_LOADING,
  CREATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_LOADING,
  DELETE_USER_SUCCESS,
  FETCH_USER_ROLES_FAILURE,
  FETCH_USER_ROLES_SUCCESS,
  FETCH_USER_ROLES_LOADING,
  DELETE_ADMIN_FAILURE,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_LOADING
} from "../actionTypes";

export const userID = token().id;

export const setAdminUser = role => ({
  type: GET_ADMIN_USER,
  payload: role
});

export const fetchAdminUsers = adminUsers => ({
  type: GET_ALL_ADMIN_USERS,
  payload: adminUsers
});
export const fetchUsersFailure = () => ({
  type: FETCH_USERS_FAILURE
});


export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  error
});

const isFetchingAdmin = (payload) => ({
  type: IS_FETCHING_ADMIN_USERS,
  payload
});

export const fetchRoles = UserRoles => ({
  type: FETCH_USERS_ROLES,
  payload: UserRoles
});

export const fetchRolePermisions = RolePermision => ({
  type: FETCH_USER_PERMISION_SUCCESS,
  payload: RolePermision
});

export const fetchAllPermisions = Permisions => ({
  type: FETCH_ALL_PERMISIONS,
  payload: Permisions
});

const isFetchingRolePermision = (payload) => ({
  type: IS_FETCHING_ROLE_PERMISION,
  payload
});

const isFetchingRoles = (payload) => ({
  type: IS_FETCHING_ROLES,
  payload
});

export const addAdminUser = (type, payload) => ({
  type,
  payload
});

export const deleteUserLoading = () => ({
  type: DELETE_USER_LOADING
});
export const deleteUserSuccess = (id) => ({
  type: DELETE_USER_SUCCESS,
  id
});

export const deleteUser = userId => dispatch => {
  dispatch(deleteUserLoading());
  return axios.delete(`/users/${userId}/`).then(response => {
    dispatch(deleteUserSuccess(userId));
    toastSuccess('User deleted successfully');
  })
    .catch(err => dispatch(deleteUserFailure()));
};
export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  error
});

export const updateUserLoading = () => ({
  type: UPDATE_USER_LOADING
});

export const updateUsersuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  user
});

export const updateUser = (user) => dispatch => {
  dispatch(updateUserLoading());
  return axios.put(`/users/${user.id}`, user).then(response => {
    dispatch(updateUsersuccess(response.data.payload.user));
    toastSuccess('User updated successfully');
  }).catch(err => {
    dispatch(updateUserFailure(err.response.data.msg));
  });
};
export const fetchUsersLoading = () => ({
  type: FETCH_USERS_LOADING
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const fetchUsers = () => dispatch => {
  dispatch(fetchUsersLoading());
  return axios.get('/users/').then(response => {
    dispatch(fetchUsersSuccess(response.data.payload.users));
  })
    .catch(error => {
      toastError('An error occurred when fetching users');
      dispatch(fetchUsersFailure());
    });
};

export const createUserFailure = () => ({
  type: CREATE_USER_FAILURE
});

export const createUserLoading = () => ({
  type: CREATE_USER_LOADING
});

export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  user
});

export const createUser = (user) => dispatch => {
  dispatch(createUserLoading());
  return axios.post('/users/', user)
    .then(response => {
      dispatch(createUserSuccess(response.data.payload.user));
      toast.success('User created successfully');
    })
    .catch(() => dispatch(createUserFailure()));
};

export const getAdminUser = () => dispatch => axios.get(`/roles/user/${userID}`)
  .then((response) => {
    dispatch(setAdminUser(response.data.payload.user_role[0].roleId));
  });

export const getAllAdminUsers = () => dispatch => {
  dispatch(isFetchingAdmin(true));
  return axios.get('/users/admin')
    .then((response) => {
      dispatch(fetchAdminUsers(response.data.payload.adminUsers));
      dispatch(isFetchingAdmin(false));
    })
    .catch(() => dispatch(isFetchingAdmin(false))
    );
};

export const getRolePermisions = roleId => dispatch => {
  dispatch(isFetchingRolePermision(true));
  return axios.get(`roles/${roleId}/permissions`)
    .then((response) => {
      dispatch(fetchRolePermisions(response.data.payload.role_permissions));
      dispatch(isFetchingRolePermision(false));
    })
    .catch(error => {
      dispatch(isFetchingRolePermision(false));
    });
};

export const getAllPermisions = (adminId) => dispatch => {
  dispatch(isFetchingRolePermision(true));
  return axios.get(`roles/${adminId}/permissions`)
    .then((response) => {
      dispatch(fetchAllPermisions(response.data.payload.role_permissions));
      dispatch(isFetchingRolePermision(false));
    })
    .catch(error => {
      dispatch(isFetchingRolePermision(false));
    });
};

export const createAdminUser = (userData) => dispatch => {
  return axios.post(`/roles/user`, userData)
    .then((response) => {
      const payload = response.data.payload.user_role;
      toastSuccess("User role changed to Admin successfully");
      dispatch(addAdminUser(ADD_ADMIN_USER_SUCCESS, payload));
      dispatch(getAllAdminUsers());
    })
    .catch((error) => {
      error = error.response.data.msg;
      toastError(error);
      dispatch(addAdminUser(ADD_ADMIN_USER_FAILURE, error));
    });
};

export const addUserRole = (type, role) => ({
  type,
  payload: role
});

export const createUserPermisionSuccess = (type, permision) => ({
  type,
  payload: permision
});

export const deleteUserRoleSuccess = role => ({
  type: DELETE_USER_ROLE_SUCCESS,
  payload: role
});

export const editUserRoleSuccess = role => ({
  type: EDIT_USER_ROLE_SUCCESS,
  payload: role
});

export const deleteUserPermisionSuccess = permision => ({
  type: DELETE_USER_PERMISION_SUCCESS,
  payload: permision
});

export const getAllUserRoles = () => dispatch => {
  dispatch(isFetchingRoles(true));
  return axios.get('/roles/').then((response) => {
    dispatch(fetchRoles(response.data.payload.roles));
    dispatch(isFetchingRoles(false));
  }).catch(error => {
    dispatch(isFetchingRoles(false));
  });
};

export const createUserRole = (roleData) => dispatch => axios.post(`/roles/`, roleData)
  .then((response) => {
    const { payload: { role } } = response.data;
    toastSuccess("User role added successfully");
    dispatch(addUserRole(ADD_USER_ROLE_SUCCESS, role));
  })
  .catch((error) => {
    error = error.response ? error.response.data.msg : 'Missing User Role';
    toastError(error);
    dispatch(addUserRole(error, ADD_USER_ROLE_FAILURE));
  });

export const deleteUserRole = (roleId) => dispatch => axios.delete(`/roles/${roleId}`)
  .then((response) => {
    toastSuccess('User role deleted successfully');
    dispatch(deleteUserRoleSuccess(roleId));
  }).catch((error) => {
    toastError(error.response.data.msg);
  });

export const editUserRole = (roleId, roleDetail) => dispatch => axios.patch(`/roles/${roleId}`, roleDetail)
  .then((response) => {
    toastSuccess('User role edited successfully');
    dispatch(editUserRoleSuccess(response.data.payload.role));
  }).catch((error) => {
    toastError(error.response.data.msg);
  });

export const deleteUserPermision = (permisionId) => dispatch => axios.delete(`roles/permissions/${permisionId}`)
  .then((response) => {
    toastSuccess('User permission deleted successfully');
    dispatch(deleteUserPermisionSuccess(permisionId));
  }).catch((error) => {
    toastError(error.response.data.msg);
  });

export const createUserPermision = (permissionData) => dispatch => axios.post(`roles/permissions`, permissionData)
  .then((response) => {
    const responseData = response ? response.data.msg : 'Not created, Please Contact Admin';

    toastSuccess('User permission created successfully');
    dispatch(createUserPermisionSuccess(responseData, ADD_USER_PERMISION_SUCCESS));
  }).catch((error) => {
    error = error.response ? error.response.data.msg : 'Not created, Please Contact Admin';
    toastError(error);
  });

export const getTappedUsersSucess = (tabbedUsers) => ({
  type: GET_TAPPED_USERS_SUCCESS,
  payload: tabbedUsers
});

export const getTappedUsersFailure = (error) => ({
  type: GET_TAPPED_USERS_FAILURE,
  payload: error,
});

export const getTappedUsers = (date = null) => (dispatch) => {
  const dateRange = date;
  const url = dateRange ? `reports/taps/daily/?dateRange=${dateRange.endDate}:${dateRange.startDate}` : 'reports/taps/daily';

  return axios.get(url)
    .then(response => {
      dispatch(getTappedUsersSucess(response.data.payload));
    })
    .catch((error) => {
      dispatch(getTappedUsersFailure(error.response.data));
    });
};
export const fetchUserRolesSuccess = (roles) => ({
  type: FETCH_USER_ROLES_SUCCESS,
  roles
});

export const fetchUserRolesLoading = () => ({
  type: FETCH_USER_ROLES_LOADING
});

export const fetchUserRolesFailure = (error) => ({
  type: FETCH_USER_ROLES_FAILURE,
  error
});

export const fetchUserRoles = () => dispatch => {
  dispatch(fetchUserRolesLoading());
  return axios.get('/roles/')
    .then((response) => {
      dispatch(fetchUserRolesSuccess(response.data.payload.roles));
    }).catch(err => dispatch(fetchUserRolesFailure(err.response.data.msg)));
};

export const revokeAdminSuccess = (payload) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload
});

export const revokeAdminLoading = (isDeleting) => ({
  type: DELETE_ADMIN_LOADING,
  isDeleting
});

export const revokeAdminFailure = (error) => ({
  type: DELETE_ADMIN_FAILURE,
  error
});

export const revokeAdmin = (userRoleId) => dispatch => {
  dispatch(revokeAdminLoading(true));
  return axios.delete(`/roles/user/delete/${userRoleId}`)
    .then((response) => {
      toastSuccess(response.data.msg);
      dispatch(revokeAdminSuccess(response.data.payload));
      dispatch(revokeAdminLoading(false));
      dispatch(getAllAdminUsers());
    }).catch(err => dispatch(revokeAdminFailure(err.response.data.msg)));
};