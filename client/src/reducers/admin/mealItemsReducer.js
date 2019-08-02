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
  EDIT_MEAL_ITEM_LOADING,
  EDIT_MEAL_ITEM_SUCCESS,
  EDIT_MEAL_ITEM_FAILURE,
  MEAL_EXISTS_RESULT,
} from '../../actions/actionTypes';
import filter from '../../helpers/filter';
import { findUpdatedIndex } from '../../helpers/mealsHelper';
import { initialMealItems } from '../initialState';

const mealItemsReducer = (state = initialMealItems, action) => {
  switch (action.type) {
    case FETCH_MEAL_ITEMS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_MEAL_ITEMS_SUCCESS:
      return {
        ...state,
        meals: action.payload.mealItems,
        pagination: action.payload.pagination,
      };
    case DELETE_MEAL_ITEM_LOADING:
      return { ...state, isDeleting: action.payload };
    case DELETE_MEAL_ITEM_SUCCESS:
      return {
        ...state,
        meals: filter(state.meals, action.payload),
      };
    case FETCH_MEAL_ITEMS_FAILURE:
      return state;
    case DELETE_MEAL_ITEM_FAILURE:
      return state;
    case SET_ADD_MEAL_ERRORS:
      return {
        ...state,
        mealModal: {
          ...state.mealModal,
          errors: action.payload,
        },
      };
    case SHOW_MEAL_MODAL:
      return {
        ...state,
        mealModal: {
          ...state.mealModal,
          show: action.payload.show,
          edit: action.payload.edit,
        },
      };
    case SET_ADD_MEAL_LOADING:
      return {
        ...state,
        mealModal: {
          ...state.mealModal,
          isLoading: action.payload,
          addBtnDisabled: action.payload,
        },
      };
    case ADD_MEAL_ITEM_SUCCESS:
      return {
        ...state,
        meals: [...state.meals, action.payload],
      };
    case EDIT_MEAL_ITEM_LOADING:
      return {
        ...state,
        mealModal: {
          ...state.mealModal,
          isLoading: action.payload,
          addBtnDisabled: action.payload,
        },
      };
    case EDIT_MEAL_ITEM_SUCCESS:
      return {
        ...state,
        meals: [
          ...state.meals.slice(
            0,
            findUpdatedIndex(state.meals, action.payload.mealItemId)
          ),
          { ...action.payload.mealItem, id: action.payload.mealItemId },
          ...state.meals.slice(
            findUpdatedIndex(state.meals, action.payload.mealItemId) + 1
          ),
        ],
      };
    case MEAL_EXISTS_RESULT:
      return {
        ...state,
        loadingMealExistence: action.payload.loadingMealExistence,
        mealExists: action.payload.mealExists,
        filteredMeals: action.payload.filteredMeals,
      };
    case EDIT_MEAL_ITEM_FAILURE:
      return state;
    default:
      return state;
  }
};

export default mealItemsReducer;
