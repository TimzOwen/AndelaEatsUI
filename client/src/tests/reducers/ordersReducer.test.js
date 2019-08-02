import { orders } from "../../reducers/initialState";
import ordersReducer from "../../reducers/ordersReducer";
import {
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_FILTERED_ORDERS,
  DELETE_ORDER_SUCCESS,
  EDIT_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  GET_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  CREATE_MENU_RATING_SUCCESS,
  DELETE_ORDER_LOADING,
  CREATE_MENU_RATING_LOADING,
  CREATE_MENU_RATING_FAILURE
} from "../../actions/actionTypes";

/*
global jest
expect
*/
describe('Past Orders Reducer', () => {
  describe('FETCH_ORDERS_* action group', () => {
    it('_LOADING :: should set isLoading property', () => {
      const action = {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      };
      const newState = ordersReducer(orders, action);
      expect(newState.isLoading).toEqual(true);
    });
    it('_SUCCESS :: should set orders properties', () => {
      const action = {
        type: FETCH_ORDERS_SUCCESS,
        orders: {
          totalRecords: 1,
          currentPage: 1,
          meals: [{ name: "sweet food" }]
        }
      };
      const newState = ordersReducer(orders, action);
      expect(newState.currentPage).toEqual(1);
      expect(newState.meals).toEqual(action.orders.meals);
    });
    it('_FAILURE :: should set error property/properties', () => {
      const action = {
        type: FETCH_ORDERS_FAILURE,
        error: new Error("Unable to fetch data")
      };
      const newState = ordersReducer(orders, action);
      expect(newState.error).toEqual(action.error);
    });
  });

  describe('EDIT', () => {
    it('_SUCCESS :: should edit successfully', () => {
      const action = {
        type: EDIT_ORDER_SUCCESS,
        id: 123
      };
      const newState = ordersReducer(orders, action);
      expect(newState.currentPage).toEqual(1);
    });
  });

  describe('UPDATE', () => {
    it('_SUCCESS :: should update successfully', () => {
      const action = {
        type: UPDATE_ORDER_SUCCESS,
        payload: { id: 123 }
      };
      const newState = ordersReducer({
        ...orders, orders: [{ id: "123" }]
      }, action);
      expect(newState.currentPage).toEqual(1);
    });
  });

  describe('DELETE', () => {
    it('_SUCCESS :: should delete successfully', () => {
      const action = {
        type: DELETE_ORDER_SUCCESS,
        id: 123
      };
      const newState = ordersReducer({ ...orders, orders: [{ id: 12 }] }, action);
      expect(newState.currentPage).toEqual(1);
      expect(newState.totalRecords).toEqual(-1);
      expect(newState.orders[0].id).toEqual(12);
    });

    it('DELETE_ORDER_FAILURE :: should return initial state', () => {
      const action = {
        type: DELETE_ORDER_FAILURE,
        payload: "an error occured"
      };
      const newState = ordersReducer(orders, action);
      expect(newState).toEqual(orders);
    });
    it('DELETE_ORDER_LOADING :: should change isDeleting state', () => {
      const action = {
        type: DELETE_ORDER_LOADING,
        payload: true
      };
      const newState = ordersReducer(orders, action);
      expect(newState.isDeleting).toEqual(action.payload);
    });

    it('CREATE_MENU_RATING_LOADING :: should change isLoading state', () => {
      const action = {
        type: CREATE_MENU_RATING_LOADING,
      };
      const newState = ordersReducer(orders, action);
      expect(newState.isLoading).toEqual(true);
    });
    it('CREATE_MENU_RATING_FAILURE :: should change isLoading state', () => {
      const action = {
        type: CREATE_MENU_RATING_FAILURE,
      };
      const newState = ordersReducer(orders, action);
      expect(newState.isLoading).toEqual(false);
    });
  });

  describe('FETCH_FILTERED_ORDERS action', () => {
    it('should set filtered orders when successful', () => {
      const action = {
        type: FETCH_FILTERED_ORDERS,
        orders: {
          totalRecords: 1,
          currentPage: 1,
          meals: [{ name: "sweet food" }]
        }
      };
      const newState = ordersReducer(orders, action);
      expect(newState.currentPage).toEqual(1);
      expect(newState.meals).toEqual(action.orders.meals);
      expect(newState.isFiltered).toEqual(true);
    });
  });

  describe('GET_ORDER_SUCCESS action', () => {
    it('should set menu/order when successful', () => {
      const action = {
        type: GET_ORDER_SUCCESS,
        order: {
          id: 201
        }
      };
      const newState = ordersReducer(orders, action);
      expect(newState.menu.id).toEqual(201);
    });
  });

  it('should return default state for unlisted initial state/action type', () => { //eslint-disable-line
    const action = {
      type: 'FETCH_ME',
    };
    const newState = ordersReducer(undefined, action);
    expect(newState).toEqual(orders);
  });

  describe('CREATE_MENU_RATING_SUCCESS action', () => {
    it('should create rating successfully', () => {
      const action = {
        type: CREATE_MENU_RATING_SUCCESS,
        payload: {
          typeId: 201,
          rating: 2

        }
      };
      const newState = ordersReducer({ ...orders, orders: [{ id: 201 }] }, action);

      expect(newState.orders[0].user_rating).toEqual(action.payload.rating);
    });
  });
});
