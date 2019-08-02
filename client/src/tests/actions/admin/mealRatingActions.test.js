/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_MEAL_RATING_LOADING,
  FETCH_MEAL_RATING_SUCCESS,
  FETCH_MEAL_RATING_FAILURE,
} from '../../../actions/actionTypes';

import { fetchMealRatings } from '../../../actions/admin/mealRatingActions';
import { mealRatings, pagination } from '../../__mocks__/mockMealItems';

describe('MealRatings actions', () => {
  describe('Fetch meal ratings', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch meal ratings success', async (done) => {
      moxios.stubRequest(`/ratings/2018-21-1/?userId=Lhjskksk`, {
        status: 200,
        response: {
          payload: mealRatings.payload
        }
      });

      const expectedActions = [
        {
          type: FETCH_MEAL_RATING_LOADING,

        },
        {
          type: FETCH_MEAL_RATING_SUCCESS,
          payload: mealRatings.payload
        },
      ];

      const store = mockStore({});

      await store
        .dispatch(fetchMealRatings('2018-21-1', 'Lhjskksk'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('fetch meal ratings failure', async (done) => {
      moxios.stubRequest(`/ratings/2018-21-1/?userId=Lhjskksk`, {
        status: 401,
      });

      const expectedActions = [
        {
          type: FETCH_MEAL_RATING_LOADING,

        },
        {
          type: FETCH_MEAL_RATING_FAILURE,
        },
      ];

      const store = mockStore({});

      await store
        .dispatch(fetchMealRatings('2018-21-1', 'Lhjskksk'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});
