import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ReactStars from 'react-stars';
import OrderHistory, {
  Orders
} from '../../../components/OrderHistory/OrderHistory';
import Loader from '../../../components/common/Loader/Loader';
import orders from '../../__mocks__/mockOrders';


/*
global jest
expect
*/
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const menuList = [
  {
    id: 183,
    isDeleted: false,
    date: "Fri, 10 May 2019 00:00:00 GMT",
    mealPeriod: "lunch",
    mainMealId: 153,
    allowedSide: 1,
    allowedProtein: 1,
    sideItems: [
      {
        id: 67,
        isDeleted: false,
        mealType: "side",
        name: "Afang soup",
        description: "Afang soup",
        image: "https://res.cloudinary.com/dunnio1id/image/upload/v1541564567/hqsytk8lcgs9jkz3u0rg.jpg",
        locationId: 1,
        timestamps: {
          created_at: "2018-11-07",
          updated_at: "Wed, 07 Nov 2018 03:56:28 GMT"
        }
      }
    ],
    proteinItems: [
      {
        id: 157,
        isDeleted: false,
        mealType: "protein",
        name: "Cat fish",
        description: "Protein",
        image: "/assets/images/default.png",
        locationId: 1,
        timestamps: {
          created_at: "2019-04-10",
          updated_at: "Wed, 10 Apr 2019 14:27:19 GMT"
        }
      }
    ],
    vendorEngagementId: 44,
    locationId: 1,
    timestamps: {
      created_at: "2019-05-08",
      updated_at: "Wed, 08 May 2019 06:10:26 GMT"
    },
    mainMeal: {
      id: 153,
      isDeleted: false,
      mealType: "main",
      name: "Amala",
      description: "Swallow",
      image: "/assets/images/default.png",
      locationId: 1,
      timestamps: {
        created_at: "2019-04-10",
        updated_at: "Wed, 10 Apr 2019 14:27:19 GMT"
      }
    }
  },
];

const menu = {
  isLoading: false,
  isDeleting: false,
  isCreating: false,
  dateOfMeal: null,
  mealPeriod: "lunch",
  menuList,
  vendorEngagements: [],
  mealItems: [],
  meta: {
    total_rows: 4,
    total_pages: 1,
    current_page: 1,
    next_page: null,
    prev_page: null
  },
  error: {
    status: false,
    message: null
  },
  startDateOfSearch: "Wed, 08 May 2019 00:00:00 GMT",
  endDateOfSearch: "Mon, 13 May 2019 00:00:00 GMT"
};

let mountedComponent;
let props = {
  menu,
  match: {
    url: '/orders'
  },
  pastMenus: [{
    date:
    "2019-05-08",
    menus: menuList
  }],
  orders: {
    isLoading: false,
    meals: [{
      id: '000023',
      name: {
        main: 'Ugali',
        protein: 'Beef'
      },
      imageUrl: 'http://cdn.playbuzz.com/cdn/89c9243a-e0cd-495e-90e0-11642327f13f/f4b834c8-a506-43f5-8c2c-3e125311275c_560_420.jpg', //eslint-disable-line
      orderDate: '2018-07-09T10:51:21.876Z',
      isCollected: false,
      rating: 0,
      isFiltered: false,
    }],
    currentPage: 1,
    totalRecords: 0,
    orders,
  },
  fetchOrders: () => Promise.resolve(),
  filterOrders: () => Promise.resolve(),
  deleteOrder: () => Promise.resolve(),
  fetchMenus: () => Promise.resolve(),
  fetchMenu: () => Promise.resolve()
};

/**
 * @description Initialise the component
 *
 * @returns {object} ManageRecipe - Mounted component
 */
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Orders {...props} />);
  }
  return mountedComponent;
};

describe('Component: Orders', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(getComponent()).toMatchSnapshot();
  });
  it('shows loader', () => {
    const wrapper = getComponent();
    wrapper.setProps({
      menu: {},
      orders: {
        ...props.orders,
        isLoading: true,
      }
    });
    expect(wrapper.find(Loader).length).toEqual(1);
  });
  it('shows error when failed to load orders', () => {
    const wrapper = getComponent();
    wrapper.setProps({
      orders: {
        ...props.orders,
        orders: [],
        error: 'Failed to load'
      }
    });
  });

  describe('Class Methods test:: Call', () => {
    it('componentDidMount()', () => {
      const spy = jest.spyOn(Orders.prototype, 'componentDidMount');
      getComponent().instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });

    it('onChange()', () => {
      const target = {
        name: "searchParam",
        value: "Rice Beans"
      };
      const spy = jest.spyOn(Orders.prototype, 'onChange');
      getComponent().instance().onChange({ target });
      expect(spy).toHaveBeenCalled();
      expect(getComponent().instance().state.searchParam).toBe(target.value);
    });

    it('clearForm()', () => {
      const spy = jest.spyOn(Orders.prototype, 'clearForm');
      getComponent().instance().setState({
        isOpen: true,
        searchParam: 'Beans yam',
        start: 'today',
        end: 'tomorrow',
        showModal: false,
        modalContent: null
      });
      getComponent().instance().clearForm();
      expect(spy).toHaveBeenCalled();

      expect(getComponent().instance().state.searchParam).toEqual('');
    });

    describe('handlePageChange()', () => {
      it('then calls fetchOrders', () => {
        const page = 2;
        const fetchOrdersSpy = jest.spyOn(props, 'fetchOrders');
        const pageChangeSpy = jest.spyOn(Orders.prototype, 'handlePageChange');
        getComponent().instance().handlePageChange(page);
        expect(pageChangeSpy).toHaveBeenCalled();
        expect(fetchOrdersSpy).toHaveBeenCalled();
      });

      it('then calls filterOrders', () => {
        const page = 2;
        props = { ...props, orders: { ...props.orders, isFiltered: true } };
        const filterOrdersSpy = jest.spyOn(props, 'filterOrders');
        getComponent().instance().handlePageChange(page);
        expect(filterOrdersSpy).toHaveBeenCalled();
      });
    });

    it('handleFilter()', () => {
      const spy = jest.spyOn(Orders.prototype, 'handleFilter');
      getComponent().instance().handleFilter();
      expect(spy).toHaveBeenCalled();
      expect(getComponent().instance().state.isOpen).toEqual(false);
    });

    it('showTotal()', () => {
      const spy = jest.spyOn(Orders.prototype, 'showTotal');
      const summary = getComponent().instance().showTotal(5, [1, 3]);
      expect(spy).toHaveBeenCalled();
      expect(summary).toEqual("Showing 1 - 3 of 5 items");
    });
  });

  describe('Page interactions', () => {
    it('simulate click action on filter button', () => {
      const wrapper = getComponent();
      expect(wrapper.find('.filter .dropdown.active').length).toBe(0);
      (wrapper.find('.filter > button').at(0)).simulate('click');
      expect(wrapper.find('.filter .dropdown.active').length).toBe(1);
    });

    it('simulate click action on cancel button', () => {
      const spy = jest.spyOn(Orders.prototype, 'clearForm');
      const cancelButton = getComponent().find('.actions .action-item').at(0);
      cancelButton.simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('simulate click action on close button', () => {
      const wrapper = getComponent();
      const cancelButton = wrapper.find('.actions .action-item').at(1);
      cancelButton.simulate('click');
      expect(wrapper.find('.filter .dropdown.active').length).toBe(0);
    });

    it('simulate click action on DatePicker components', () => {
      const wrapper = getComponent();
      const startDatePicker = wrapper.find('DatePicker').at(0);
      startDatePicker.simulate('change');
      expect(wrapper.instance().state.start).toEqual(undefined);

      const endDatePicker = wrapper.find('DatePicker').at(1);
      endDatePicker.simulate('change');
      expect(wrapper.instance().state.end).toEqual(undefined);
    });
  });

  describe('Modal Interaction', () => {
    const wrapper = getComponent();

    it('show Modal', () => {
      const { meals } = props.orders;
      const spy = jest.spyOn(wrapper.instance(), 'showModal');
      getComponent().instance().showModal(meals[0]);
      // expect(spy).toHaveBeenCalled();
      expect(getComponent().instance().state.modalContent).toBe(meals[0]);
      expect(getComponent().instance().state.showModal).toBe(true);
    });

    it('delete Modal', () => {
      const { meals } = props.orders;
      const spy = jest.spyOn(Orders.prototype, 'deleteOrder');
      getComponent().instance().deleteOrder(meals[0].id);
      expect(spy).toHaveBeenCalled();
      expect(getComponent().instance().state.showModal).toBe(false);
    });

    it('hide Modal', () => {
      const spy = jest.spyOn(Orders.prototype, 'hideModal');
      getComponent().instance().hideModal();
      expect(spy).toHaveBeenCalled();
      expect(getComponent().instance().state.showModal).toBe(false);
    });
  });
});

describe('Connected OrderHistory component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      orders: {},
      upcomingMenus: {}
    });
    const wrapper = shallow(<OrderHistory store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

jest.mock('../../../components/MealCard/Modal', () => () => (
  <div id="mockUserCom">
    mockModal
  </div>
));

describe('Test suite for rating an order', () => {
  it('Should rate a vendor', () => {
    const store = mockStore({
      allRatings: {
        ratingList: [{
          overallRating: 4, mainMeal: 'Caribbean pasta', date: '2019-08-05'
        }]
        
      },
      userReducer: {}
    });
    const newOrders = {
      isLoading: false,
      error: "",
      totalRecords: 0,
      currentPage: 1,
      meals: [],
      isFiltered: false,
      orders: [
        {
          id: 153,
          isDeleted: false,
          userId: "myrandomid",
          dateBookedFor: "Fri, 10 May 2019 00:00:00 GMT",
          dateBooked: "Wed, 08 May 2019 00:00:00 GMT",
          channel: "web",
          mealPeriod: "lunch",
          orderStatus: "collected",
          hasRated: false,
          menuId: 183,
          locationId: 1,
          timestamps: {
            created_at: "2019-05-08",
            updated_at: "Wed, 08 May 2019 06:10:26 GMT"
          },
          mealItems: [
            {
              id: 67,
              mealType: "side",
              name: "Afang soup",
              image: "https://res.cloudinary.com/dunnio1id/image/upload/v1541564567/hqsytk8lcgs9jkz3u0rg.jpg"
            },
            {
              id: 157,
              mealType: "protein",
              name: "Cat fish",
              image: "/assets/images/default.png"
            },
            {
              id: 153,
              mealType: "main",
              name: "Amala",
              image: "/assets/images/default.png"
            }
          ],
          user: "Aman Hasnoname",
          user_rating: null
        },
      ],
      menu: {
        meal: {
          main: [],
          firstAccompaniment: [],
          secondAccompaniment: []
        }
      },
      isDeleting: false,
      rating: 0
    };

    const completeProps = {
      ...props, 
      orders: newOrders, 
      menu, 
      createRating: jest.fn(() => Promise.resolve()),
      store: mockStore
    };
    const wrapper = mount(<Provider store={store}><Orders {...completeProps} /></Provider>);
    wrapper.setProps({ store });

    const reactStar = wrapper.find(ReactStars);
    wrapper
      .find('.rate-button').simulate('click', { preventDefault: jest.fn() });
    const rate = reactStar.find('span');
    // an attempt to submit the form without rating
    wrapper
      .find('#rating-form').simulate('submit', { preventDefault: jest.fn() });
    rate.at(1).simulate('click', '');
    // an attempt to submit the form without comments
    wrapper
      .find('#rating-form').simulate('submit', { preventDefault: jest.fn() });
    wrapper
      .find('.modal-comment')
      .simulate('change', { target: { value: "Good job!" } });
    wrapper
      .find('#rating-form').simulate('submit', { preventDefault: jest.fn() });
  });
});
