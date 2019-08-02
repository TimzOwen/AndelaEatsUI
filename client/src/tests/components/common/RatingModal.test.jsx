import React from 'react';
import { mount, shallow } from 'enzyme';
import RatingModal from '../../../components/common/RatingModal';
import Loader from '../../../components/common/Loader/Loader';

const props = {
  displayModal: false,
  modalContent: {
    dateBookedFor: '10-05-2019'
  },
  closeModal: jest.fn(),
  modalTitle: '10-05-2019',
  handleSubmit: jest.fn(),
  isLoading: false,
  handleCloseModal: jest.fn()
};
/*
global jest
expect
*/

let wrapper;

beforeEach(() => {
  wrapper = mount(<RatingModal {...props} />);
});
describe('Modal Component', () => {
  it('should shows loader', () => {
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it('calls  handleCloseModal', () => {
    wrapper.find('button[type="button"]').at(1).simulate('click');
    expect(wrapper.instance().state.selected).toEqual(null);
  });
});
