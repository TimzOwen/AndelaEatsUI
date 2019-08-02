/* eslint-disable no-undef */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MealCard from '../../../../components/Admin/Meals/MealCard';
import { mealItems } from '../../../__mocks__/mockMealItems';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  allRatings: {
  }
});

describe('MealCard Component', () => {
  let wrapper;
  let props;
  beforeAll(() => {
    props = {
      ...mealItems[0],
      showDeleteModal: jest.fn(),
      showEditModal: jest.fn()
    };
    wrapper = shallow(
      <Provider store={store}><MealCard {...props} /></Provider>);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have image div', () => {
    const child = mount(wrapper.get(0));
    const elements = child.find('.image');
    expect(elements.length).toBe(1);
  });

  it('should have label-container div', () => {
    const child = mount(wrapper.get(0));
    const elements = child.find('.label-container');
    expect(elements.length).toBe(1);
  });

  it('should have details div', () => {
    const child = mount(wrapper.get(0));
    const elements = child.find('.details');
    expect(elements.length).toBe(1);
  });

  it('should have controls div', () => {
    const child = mount(wrapper.get(0));
    const elements = child.find('.controls');
    expect(elements.length).toBe(1);
  });

  it('calls the showEditModal action onClick of Edit button', () => {
    const child = mount(wrapper.get(0));
    const editButton = child.find('.controls').children().first();
    editButton.simulate('click');
    expect(props.showEditModal).toHaveBeenCalled();
  });

  it('calls the showEditModal action onClick of Edit button', () => {
    const child = mount(wrapper.get(0));
    const deleteButton = child.find('.controls').children().last();
    deleteButton.simulate('click');
    expect(props.showDeleteModal).toHaveBeenCalled();
  });
});
