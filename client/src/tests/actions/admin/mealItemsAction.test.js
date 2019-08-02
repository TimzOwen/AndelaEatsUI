/* eslint-disable no-undef */
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_FAILURE,
  FETCH_MEAL_ITEMS_SUCCESS,
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
} from '../../../actions/actionTypes';

import {
  fetchMealItems,
  deleteMealItem,
  addMealItem,
  editMealItem,
  checkMealExistence,
  showMealModal
} from '../../../actions/admin/mealItemsAction';
import { mealItems, pagination } from '../../__mocks__/mockMealItems';

describe('Admin::Meal Items Action', () => {
  const formData = {
    name: 'Ugeli',
    type: 'side',
    image: new File([''], 'filename', { type: 'image/png' }),
  };

  describe('Fetch meal Items', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch meal items success', async (done) => {
      moxios.stubRequest(`/meal-items`, {
        status: 200,
        response: {
          payload: {
            mealItems,
            meta: pagination,
          },
        },
      });

      const expectedActions = [
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: true,
        },
        {
          type: FETCH_MEAL_ITEMS_SUCCESS,
          payload: { mealItems, pagination },
        },
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: false,
        },
      ];

      const store = mockStore({});

      await store.dispatch(fetchMealItems()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });

    it('fetch meal items failure', async (done) => {
      moxios.stubRequest(`/meal-items`, {
        status: 401,
      });

      const expectedActions = [
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: true,
        },
        {
          type: FETCH_MEAL_ITEMS_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: false,
        },
      ];

      const store = mockStore({});

      await store.dispatch(fetchMealItems()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  });

  describe('Add meal Item Action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    const store = mockStore({});

    const expectedActions = [
      {
        type: SET_ADD_MEAL_LOADING,
        payload: true,
      },
      {
        type: SET_ADD_MEAL_LOADING,
        payload: false,
      },
    ];

    it('should add a meal without error', async (done) => {
      moxios.stubRequest(`/meal-items/`, {
        status: 201,
        response: {
          payload: {
            mealItem: {
              ...mealItems[0],
            },
          },
        },
      });

      const newExpectedActions = [
        expectedActions[0],
        {
          type: ADD_MEAL_ITEM_SUCCESS,
          payload: { ...mealItems[0] },
        },
        {
          type: SHOW_MEAL_MODAL,
          payload: {
            edit: false,
            show: false,
          },
        },
        expectedActions[1],
      ];

      await store.dispatch(addMealItem(formData)).then(() => {
        expect(store.getActions()).toEqual(newExpectedActions);
      });
      done();
    });
  });

  describe('Delete meal Items', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('delete meal items success', async (done) => {
      moxios.stubRequest(`/meal-items/${mealItems[0].id}`, {
        status: 200,
        response: {},
      });

      const expectedActions = [
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: true,
        },
        {
          type: DELETE_MEAL_ITEM_SUCCESS,
          payload: mealItems[0].id,
        },
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: false,
        },
      ];

      const store = mockStore({});

      await store.dispatch(deleteMealItem(mealItems[0].id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });

    it('delete meal item failure', async (done) => {
      moxios.stubRequest(`/meal-items/${mealItems[0].id}`, {
        status: 401,
      });

      const expectedActions = [
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: true,
        },
        {
          type: DELETE_MEAL_ITEM_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: false,
        },
      ];

      const store = mockStore({});

      await store.dispatch(deleteMealItem(mealItems[0].id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  });

  describe('Edit Meal Item', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('updates meal item successfully', async (done) => {
      const expectedActions = [
        {
          type: EDIT_MEAL_ITEM_LOADING,
          payload: true,
        },
        {
          type: EDIT_MEAL_ITEM_SUCCESS,
          payload: {
            mealItemId: 1,
            mealItem: { ...mealItems[0] },
          },
        },
        {
          type: SHOW_MEAL_MODAL,
          payload: {
            show: false,
            edit: false,
          },
        },
        {
          type: EDIT_MEAL_ITEM_LOADING,
          payload: false,
        },
      ];

      const store = mockStore({
        mealItems: {
          meals: mealItems,
        },
      });

      moxios.stubRequest(`/meal-items/${mealItems[0].id}`, {
        status: 200,
        response: {
          payload: {
            mealItem: mealItems[0],
          },
        },
      });

      await store.dispatch(editMealItem(mealItems[0].id, formData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });

    it('should show modal', () => {
      const expectedActions = [
        {
          type: SHOW_MEAL_MODAL,
          payload: {
            edit: false,
            show: false,
          }, 
        }
      ];

      const store = mockStore({});
      store.dispatch(showMealModal(false, false));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('throws error on update failure', async (done) => {
      const expectedActions = [
        {
          type: EDIT_MEAL_ITEM_LOADING,
          payload: true,
        },
        {
          type: EDIT_MEAL_ITEM_FAILURE,
          payload: new Error('Request failed with status code 500'),
        },
        {
          type: EDIT_MEAL_ITEM_LOADING,
          payload: false,
        },
      ];

      const store = mockStore({});

      moxios.stubRequest(`/meal-items/${mealItems[0].id}`, {
        status: 500,
        response: {
          msg: 'error',
        },
      });

      await store.dispatch(editMealItem(mealItems[0].id, formData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  });
  describe('Check whether a meal already exists', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('checks whether a meal exists in the system', async () => {
      const mockStore = configureStore([thunk]);
      const store = mockStore();
      const expectedActions = [
        {
          type: 'MEAL_EXISTS_RESULT',
          payload: { loadingMealExistence: true, mealExists: null, mealItems: [] },
        },
        {
          type: 'MEAL_EXISTS_RESULT',
          payload: { loadingMealExistence: false, mealExists: null, mealItems: [] },
        },
      ];

      moxios.stubRequest(`/meal-items?name=G-nuts`, {
        status: 200,
        response: {
          data: {
            payload: {
              mealItems: [
                {
                  id: 67,
                  isDeleted: false,
                  mealType: 'side',
                  name: 'ground-nuts',
                  image: 'https://res.cloudinary.com/hqsytk8lcgs9jkz3u0rg.jpg',
                  locationId: 1,
                  timestamps: {
                    created_at: '2018-11-07',
                    updated_at: 'Wed, 07 Nov 2018 03:56:28 GMT',
                  },
                },
              ],
            },
          },
        },
      });

      await checkMealExistence('g-nuts')(store.dispatch);
      expect(store.getActions()).toEqual(expectedActions);
    });
    it('checks whether a meal exists in the system', async () => {
      const mockStore = configureStore([thunk]);
      const store = mockStore();
      const expectedActions = [
        {
          type: 'MEAL_EXISTS_RESULT',
          payload: { loadingMealExistence: true, mealExists: null, mealItems: [] },
        },
        {
          type: 'MEAL_EXISTS_RESULT',
          payload: { loadingMealExistence: false, mealExists: null, mealItems: [] },
        },
      ];

      moxios.stubRequest(`/meal-items?name=G-nuts`, {
        status: 200,
        response: {
          data: {
            payload: {
              mealItems: [
                {
                  id: 67,
                  isDeleted: false,
                  mealType: 'side',
                  name: 'ground-nuts',
                  image: 'https://res.cloudinary.com/hqsytk8lcgs9jkz3u0rg.jpg',
                  locationId: 1,
                  timestamps: {
                    created_at: '2018-11-07',
                    updated_at: 'Wed, 07 Nov 2018 03:56:28 GMT',
                  },
                },
              ],
            },
          },
        },
      });

      await checkMealExistence('g-nuts')(store.dispatch);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('checks whether a meal exists in the system', async () => {
      const mockStore = configureStore([thunk]);
      const store = mockStore();
      const expectedActions = [
        {
          type: 'MEAL_EXISTS_RESULT',
          payload: { loadingMealExistence: true, mealExists: null, mealItems: [] },
        },
        {
          type: 'MEAL_EXISTS_RESULT',
          payload: { loadingMealExistence: false, mealExists: null, mealItems: [] },
        },
      ];

      moxios.stubRequest(`/meal-items?name=G-nuts`, {
        status: 200,
        response: {
          data: {
            payload: {
              mealItems: [
                {
                  id: 67,
                  isDeleted: false,
                  mealType: 'side',
                  name: 'ground-nuts',
                  image: 'https://res.cloudinary.com/hqsytk8lcgs9jkz3u0rg.jpg',
                  locationId: 1,
                  timestamps: {
                    created_at: '2018-11-07',
                    updated_at: 'Wed, 07 Nov 2018 03:56:28 GMT',
                  },
                },
              ],
            },
          },
        },
      });

      await checkMealExistence('g-nuts')(store.dispatch);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('tests the case when a user types a non existing meal item', async () => {
      const mockStore = configureStore([thunk]);
      const store = mockStore();
      moxios.stubRequest(`/meal-items?name=Xxx`, {
        response: {
          msg: "OK",
          payload: { mealItems: [] }
        },
      });
      const expectedActions = [
        {
          type: 'MEAL_EXISTS_RESULT',
          payload: {
            loadingMealExistence: true, mealExists: null, mealItems: [] 
          },
        },
        {
          type: 'MEAL_EXISTS_RESULT',
          payload: {
            filteredMeals: [], loadingMealExistence: false, mealExists: false,
          },
        },
      ];

      await checkMealExistence('Xxx')(store.dispatch);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
