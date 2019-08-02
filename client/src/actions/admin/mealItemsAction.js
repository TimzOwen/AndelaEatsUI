import axios from 'axios';
import { toastSuccess, toastError } from '../../helpers/toast';
import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_SUCCESS,
  FETCH_MEAL_ITEMS_FAILURE,
  SET_ADD_MEAL_ERRORS,
  SET_ADD_MEAL_LOADING,
  ADD_MEAL_ITEM_SUCCESS,
  SHOW_MEAL_MODAL,
  DELETE_MEAL_ITEM_LOADING,
  DELETE_MEAL_ITEM_SUCCESS,
  DELETE_MEAL_ITEM_FAILURE,
  EDIT_MEAL_ITEM_FAILURE,
  EDIT_MEAL_ITEM_SUCCESS,
  EDIT_MEAL_ITEM_LOADING,
  MEAL_EXISTS_RESULT,
} from '../actionTypes';
import { mealImageUpload } from '../../helpers/mealsHelper';

export const fectchMealItemsLoading = (isLoading) => ({
  type: FETCH_MEAL_ITEMS_LOADING,
  payload: isLoading,
});

export const fetchMealItemsFailure = (error) => ({
  type: FETCH_MEAL_ITEMS_FAILURE,
  payload: error,
});

export const mealItemExistence = (response) => ({
  type: MEAL_EXISTS_RESULT,
  payload: {
    loadingMealExistence: false,
    mealExists: Boolean(response.data.payload.mealItems.length),
    filteredMeals: response.data.payload.mealItems
  },
});

export const fetchMealItemsSuccess = (mealItems, pagination) => ({
  type: FETCH_MEAL_ITEMS_SUCCESS,
  payload: { pagination, mealItems },
});

export const fetchMealItems = () => (dispatch) => {
  dispatch(fectchMealItemsLoading(true));
  return axios
    .get(`/meal-items`)
    .then((response) => {
      const { meta: pagination, mealItems } = response.data.payload;
      dispatch(fetchMealItemsSuccess(mealItems, pagination));
      dispatch(fectchMealItemsLoading(false));
    })
    .catch((error) => {
      dispatch(fetchMealItemsFailure(error));
      dispatch(fectchMealItemsLoading(false));
    });
};

export const showMealModalAction = (show, edit) => ({
  type: SHOW_MEAL_MODAL,
  payload: { show, edit },
});

export const setAddMealErrors = (errors) => ({
  type: SET_ADD_MEAL_ERRORS,
  payload: errors,
});

export const addMealItemFailure = (error) => ({
  type: EDIT_MEAL_ITEM_FAILURE,
  payload: error,
});

export const setAddMealLoading = (loading) => ({
  type: SET_ADD_MEAL_LOADING,
  payload: loading,
});

export const addMealItemSuccess = (mealItem) => ({
  type: ADD_MEAL_ITEM_SUCCESS,
  payload: mealItem,
});

export const showMealModal = (show, edit) => (dispatch) => dispatch(showMealModalAction(show, edit));

export const addMealItem = (formData) => (dispatch) => {
  dispatch(setAddMealLoading(true));

  return mealImageUpload(formData.file, formData.dataurl, (error, url) => {
    if (error) throw error;
    else {
      const { file, dataurl, ...rest } = formData;
      const reqData = { ...rest, image: url };

      return axios
        .post(`/meal-items/`, reqData)
        .then((response) => {
          const { mealItem } = response.data.payload;
          toastSuccess('Meal successfully created');
          dispatch(addMealItemSuccess(mealItem));
          dispatch(showMealModalAction(false, false));
          dispatch(setAddMealLoading(false));
        })
        .catch((err) => {
          toastError(err.response.data.msg);
          dispatch(addMealItemFailure(err));
          dispatch(setAddMealLoading(false));
        });
    }
  });
};

export const deleteMealItemLoading = (isDeleting) => ({
  type: DELETE_MEAL_ITEM_LOADING,
  payload: isDeleting,
});

export const deleteMealItemFailure = (error) => ({
  type: DELETE_MEAL_ITEM_FAILURE,
  payload: error,
});

export const deleteMealItemSuccess = (mealItemId) => ({
  type: DELETE_MEAL_ITEM_SUCCESS,
  payload: mealItemId,
});

export const deleteMealItem = (mealItemId) => (dispatch) => {
  dispatch(deleteMealItemLoading(true));
  return axios
    .delete(`/meal-items/${mealItemId}`)
    .then(() => {
      toastSuccess('Deleted successfully');
      dispatch(deleteMealItemSuccess(mealItemId));
      dispatch(deleteMealItemLoading(false));
    })
    .catch((error) => {
      toastError(error.message);
      dispatch(deleteMealItemFailure(error));
      dispatch(deleteMealItemLoading(false));
    });
};

export const editMealItemLoading = (isLoading) => ({
  type: EDIT_MEAL_ITEM_LOADING,
  payload: isLoading,
});

export const editMealItemFailure = (error) => ({
  type: EDIT_MEAL_ITEM_FAILURE,
  payload: error,
});

export const editMealItemSuccess = (mealItemId, mealItem) => ({
  type: EDIT_MEAL_ITEM_SUCCESS,
  payload: {
    mealItemId,
    mealItem,
  },
});

export const editMealItem = (mealItemId, formData) => (dispatch) => {
  dispatch(editMealItemLoading(true));
  return mealImageUpload(formData.file, formData.dataurl, (error, url) => {
    if (error) {
      throw error;
    } else {
      const { file, dataurl, ...rest } = formData;
      const reqdata = { ...rest, image: url };
      return axios
        .patch(`/meal-items/${mealItemId}`, reqdata)
        .then((response) => {
          const { mealItem } = response.data.payload;
          toastSuccess('Meal item updated successfully');
          dispatch(editMealItemSuccess(mealItemId, mealItem));
          dispatch(showMealModalAction(false, false));
          dispatch(editMealItemLoading(false));
        })
        .catch((err) => {
          toastError(err.response.data.msg);
          dispatch(editMealItemFailure(err));
          dispatch(editMealItemLoading(false));
        });
    }
  });
};

export const checkMealExistence = (mealItemName) => (dispatch) => {
  const capitalizedMealName = mealItemName.charAt(0).toUpperCase() + mealItemName.slice(1);
  let payload;
  if (mealItemName.trim().length === 0) { 
    payload = { loadingMealExistence: false, mealExists: null, mealItems: [] };
  }
  payload = { loadingMealExistence: true, mealExists: null, mealItems: [] };

  dispatch({
    type: MEAL_EXISTS_RESULT,
    payload,
  });

  return axios
    .get(`/meal-items?name=${capitalizedMealName}`)
    .then((response) => {
      dispatch(mealItemExistence(response));
    })
    .catch((error) => {
      dispatch({
        type: MEAL_EXISTS_RESULT,
        payload: { loadingMealExistence: false, mealExists: null, mealItems: [] },
      });
    });
};
