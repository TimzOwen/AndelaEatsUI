/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  fetchOrders,
  filterOrders,
  deleteOrder,
  editOrder,
  updateOrder,
  updateOrderSuccess,
  getOrderByDate,
  userID,
  collectOrder,
  createRatingLoading,
  createRatingSuccess,
  createRatingFailure,
  createRating
} from '../../actions/ordersAction';

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
  MENU_IS_LOADING,
  COLLECT_ORDER_LOADING,
  COLLECT_ORDER_SUCCESS,
  COLLECT_ORDER_FAILURE,
  CREATE_MENU_RATING_LOADING,
  CREATE_MENU_RATING_SUCCESS,
  CREATE_MENU_RATING_FAILURE
} from '../../actions/actionTypes';

const id = '123';
const date = new Date();

/*
global jest
expect
*/
describe('Order actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const startDate = '2018-11-21';
  const endDate = '2018-12-02';
  const orderDetails = {};

  it('fetch past orders success', async (done) => {
    moxios.stubRequest(`/orders/user/${userID}/${startDate}/${endDate}`, {
      status: 200,
      response: {
        payload: {
          orders: []
        }
      }
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_SUCCESS,
        orders: { orders: [], currentPage: 1 }
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(fetchOrders(startDate, endDate, 1, 9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('fetch past orders failure', async (done) => {
    moxios.stubRequest(`/orders/user/${userID}/${startDate}/${endDate}`, {
      status: 401
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_FAILURE,
        error: "Request failed with status code 401"
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(fetchOrders(startDate, endDate, 1, 9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('tabs an order success', async (done) => {
    moxios.stubRequest(`/orders/collect`, {
      status: 200,
      response: {
        payload: {
          order: []
        }
      }
    });
    const expectedActions = [
      {
        type: COLLECT_ORDER_LOADING,
        payload: true
      },
      {
        type: COLLECT_ORDER_SUCCESS,
        payload: []
      }, {
        type: COLLECT_ORDER_LOADING,
        payload: false
      }];
    const store = mockStore({});
    await store.dispatch(collectOrder(orderDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('fetch past orders failure', async (done) => {
    moxios.stubRequest(`/orders/collect`, {
      status: 401
    });
    const expectedActions = [
      {
        type: COLLECT_ORDER_LOADING,
        payload: true
      },
      {
        type: COLLECT_ORDER_FAILURE,
        payload: "Request failed with status code 401"
      }, {
        type: COLLECT_ORDER_LOADING,
        payload: false
      }];
    const store = mockStore({});
    await store.dispatch(collectOrder(orderDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('edit order success', async (done) => {
    moxios.stubRequest(`/${id}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: EDIT_ORDER_SUCCESS,
        payload: {}
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(editOrder(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('edit order failure', async (done) => {
    moxios.stubRequest(`/${id}`, {
      status: 401,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(editOrder(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('delete orders success', async (done) => {
    moxios.stubRequest(`/orders/${id}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: DELETE_ORDER_LOADING,
        payload: true
      },
      {
        type: DELETE_ORDER_SUCCESS,
        payload: id
      }, {
        type: DELETE_ORDER_LOADING,
        payload: false
      }];
    const store = mockStore({});
    await store.dispatch(deleteOrder(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('delete orders failure', async (done) => {
    moxios.stubRequest(`/orders/${id}`, {
      status: 401
    });
    const expectedActions = [
      {
        type: DELETE_ORDER_LOADING,
        payload: true
      },
      {
        type: DELETE_ORDER_FAILURE,
        payload: "Request failed with status code 401"
      },
      {
        type: DELETE_ORDER_LOADING,
        payload: false
      }];
    const store = mockStore({});
    await store.dispatch(deleteOrder(123))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  const order = {
    searchParam: 'rice',
    startDate: '2018-11-21',
    endDate: '2018-12-02',
    page: 1
  };

  it('filter orders success', async (done) => {
    moxios.stubRequest(`/orders/user/${userID}/${order.startDate}/${order.endDate}`, {//eslint-disable-line
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_FILTERED_ORDERS,
        orders: { currentPage: 1 }
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(filterOrders(order))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('filter orders failure', async (done) => {
    moxios.stubRequest(`/orders/user/${userID}/${order.startDate}/${order.endDate}`, {//eslint-disable-line
      status: 401
    });

    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_FAILURE,
        error: "Request failed with status code 401"
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(filterOrders(order))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('update order failure', async (done) => {
    moxios.stubRequest(`/orders/${id}`, {
      status: 401,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: MENU_IS_LOADING,
        payload: true,
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      },
      {
        type: MENU_IS_LOADING,
        payload: false,
      }];
    const store = mockStore({});
    await store.dispatch(updateOrder({}, id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('get order success', async (done) => {
    moxios.stubRequest(`/search?date=${date}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: GET_ORDER_SUCCESS,
        order: {}
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(getOrderByDate(date))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('get order failure', async (done) => {
    moxios.stubRequest(`/search?date=${date}`, {
      status: 419,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(getOrderByDate(date))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('should create a rating successfully', async (done) => {
    moxios.stubRequest(`/ratings/order/`, {
      status: 200,
      response: {
        payload: {
          rating: 5,
          msg: 'Rating Created'
        }
      }
    });
    const expectedActions = [
      {
        type: CREATE_MENU_RATING_LOADING,
      }, {
        type: CREATE_MENU_RATING_SUCCESS,
        payload: 5
      }];
    const ratingDetails = {
      channel: "web",
      comment: 'textArea',
      rating: 5,
      orderId: 1,
      engagementId: 12,
      mainMealId: 13,
      serviceDate: '20 Nov 2018'
    };
    const store = mockStore({});
    await store.dispatch(createRating(ratingDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('should fail to rate incase of an error', async (done) => {
    moxios.stubRequest(`/ratings/order/`, {
      status: 400,
      response: {
        payload: {
          error: 'an error has occurred'
        }
      }
    });
    const ratingDetails = {
      channel: "web",
      comment: 'textArea',
      rating: 5,
      orderId: 1,
      engagementId: 12,
      mainMealId: 13,
      serviceDate: '20 Nov 2018'
    };
    const store = mockStore({});
    await store.dispatch(createRating(ratingDetails))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(CREATE_MENU_RATING_FAILURE);
      });
    done();
  });

  it('should call the createRatingLoading action', () => {
    const expectedAction = { type: CREATE_MENU_RATING_LOADING };
    expect(createRatingLoading()).toEqual({ ...expectedAction });
  });

  it('should create a rating successfully', () => {
    const payload = { payload: '5 stars' };
    const expectedAction = { type: CREATE_MENU_RATING_SUCCESS, payload };
    expect(createRatingSuccess(payload)).toEqual({ ...expectedAction });
  });

  it('should fail to create a rating incase of an error', () => {
    const payload = { payload: 'An error' };
    const expectedAction = { type: CREATE_MENU_RATING_FAILURE, payload };
    expect(createRatingFailure(payload)).toEqual({ ...expectedAction });
  });
});
