/* eslint-disable no-undef */

import React from 'react';
import { shallow } from 'enzyme';
import { MealCard, mapStateToProps } 
  from '../../../components/MealCard/MealCard';

let props = {
  url: "/orders",
  id: '0023',
  meal: {
    dateBookedFor: "Wed, 08 May 2019 00:00:00 GMT",
    mealItems: [
      {
        id: 171, image: "image1", name: "Meal1", mealType: "side" 
      },
      {
        id: 174, image: "image1", name: "Meal1", mealType: "protein", 
      },
      {
        id: 175,
        image: "/assets/images/default.png",
        mealType: "main",
        name: "Caribbean pasta"
      }
    ],
    orderStatus: "cancelled"
  },
  ratedMeal: null,
  actions: {
    handleDelete: jest.fn(),
    handleRate: jest.fn()
  },
  fetchMealRatings: jest.fn(() => Promise.resolve())
};

const getComponent = () => shallow(<MealCard {...props} />);

/*
global jest
expect
*/
describe('MealCard Component', () => {
  it('should render at least once', () => {
    const wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should render CollectedAction', () => {
    getComponent().setState({ meal: { id: 1 } });
    getComponent().setProps({
      ...props,
      meal: { ...props.meal, orderStatus: 'collected' }
    });
    expect(getComponent().find('CollectedAction').length).toBe(1);
    expect(getComponent().find('NotCollectedAction').length).toBe(0);
  });

  it('should render NotCollectedAction', () => {
    const { meal } = props;
    props = {
      ...props,
      meal: {
        ...meal, orderStatus: "booked"
      }
    };
    getComponent().setProps({
      ratedMeal: {
        result: [{
          overallRating: 4, mainMeal: 'Caribbean pasta', 
        }]
      }
    });
    expect(getComponent().find('NotCollectedAction').length).toBe(1);
    expect(getComponent().find('CollectedAction').length).toBe(0);
  });

  describe('mapStateToProps', () => {
    it('should mapStateToProps to state', () => {
      const initialState = {
        allRatings: {
          ratingList: [
            {
              date: "2019-05-08",
              vendor: "Tasty Chops",
              result: []
            }
          ]
        },
        userReducer: {}
      };
      expect(mapStateToProps(initialState, 
        { meal: props.meal }).ratedMeal.result.length).toEqual(0);
    });
  });
});
