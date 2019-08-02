import React from 'react';
import { mount, shallow } from 'enzyme';
import RatingModal from '../../../components/MealCard/RatingModal';
import Loader from '../../../components/common/Loader/Loader';

const props = {
  isLoading: true,
  displayModal: true,
  modalContent: {
    dateBookedFor: ''
  },
  closeModal: jest.fn(),
  modalTitle: '10-05-2019',
  handleSubmit: jest.fn(),
};
/*
global jest
expect
*/
describe('Modal Component', () => {
  it('should render atleast once', () => {
    const wrapper = mount(<RatingModal {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
