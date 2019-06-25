/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import { shallow } from 'enzyme';
import { Meals } from '../../../../components/Admin/Meals/Index';
import { mealItems } from '../../../__mocks__/mockMealItems';

const modalContent = {
  description: "Quae culpa nisi labore id.",
  id: 1,
  image: "http://cdn.playbuzz.com/cdn/89c9243a-e0cd-495e-90e0-11642327f13f/f4b834c8-a506-43f5-8c2c-3e125311275c_560_420.jpg",
  isDeleted: "false",
  mealType: "side",
  name: "Salad"
};

const setup = (isLoading, meals = []) => {
  const props = {
    isLoading,
    meals,
    showMealModal: jest.fn(),
    fetchMealItems: jest.fn(),
    searchMealItems: jest.fn(),
    deleteMealItem: jest.fn().mockImplementation(() => Promise.resolve())
  };
  return (shallow(<Meals {...props} />));
};

const event = {
  target: {
    name: 'mealName',
    value: 'Fish'
  }
};


describe('Admin:Meals Component', () => {
  let wrapper = setup(false);
  const mealsInstance = wrapper.instance();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call renderMeal method', () => {
    mealsInstance.renderMeal({});
  });

  it('should call toggleAddModal with empty meals', () => {
    mealsInstance.toggleAddModal();
  });

  it('should call toggleAddModal with meals', () => {
    wrapper = setup(false, mealItems);
    mealsInstance.toggleAddModal();
  });

  it('should call toggleAddModal with loading true', () => {
    wrapper = setup(true, mealItems);
    mealsInstance.toggleAddModal();
  });

  it('should call closeModal method', () => {
    const closeModalSpy = jest
      .spyOn(wrapper.instance(), 'closeModal');
    wrapper.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should call showDeleteModal method', () => {
    const showDeleteModalSpy = jest
      .spyOn(wrapper.instance(), 'showDeleteModal');
    wrapper.instance().showDeleteModal(modalContent);
    expect(showDeleteModalSpy).toHaveBeenCalled();
  });

  it('should call deleteMealItem method', () => {
    const deleteMealItemSpy = jest.spyOn(wrapper.instance(), 'deleteMealItem');
    wrapper.instance().deleteMealItem(modalContent.id);
    expect(deleteMealItemSpy).toHaveBeenCalled();
  });

  it('should call pageChange method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'pageChange');
    wrapper.instance().pageChange(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should call toggleModal onClick of Add Meal button', () => {
    const addMealButton = wrapper.find('.pull-right');
    const toggleAddModalSpy = jest.spyOn(wrapper.instance(), 'toggleAddModal');
    addMealButton.simulate('click');
    expect(toggleAddModalSpy).toHaveBeenCalled();
  });

  it('should have a meals props', () => {
    expect(wrapper.instance().props.meals).not.toBeNull();
  });

  it('should search for meal items', async () => {
    wrapper = setup(false, mealItems);
    await wrapper.instance().searchMealItems(event, mealItems);
    expect(wrapper.instance().state.foundMeals.length).toBeGreaterThan(0);
    expect(wrapper.instance().state.foundMeals[0].meal_type).toEqual('protein');
    expect(wrapper.instance().state.foundMeals[0].name).toEqual('Fish');
  });
});
