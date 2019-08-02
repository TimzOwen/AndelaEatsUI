/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import RevokeAdminModal
  from '../../../../components/Admin/Users/RevokeAdminModal';

const props = {
  closeModal: jest.fn(),
  adminUser: {
    user_role_id: 2,
    name: 'Uche Akogwu'
  },
  display: false,
  revokeAdmin: jest.fn(),
  getAllAdminUsers: jest.fn(),
};

const wrapper = shallow(<RevokeAdminModal {...props} />);

describe('Admin::RevokeAdminModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call RevokeAdminModal', () => {
    wrapper.setProps({
      display: true,
    }) 
    wrapper.find('#revoke-admin').simulate('click');
    expect(wrapper.find('.modal-content')).toBeTruthy()
  });
  it('should call revoke Admin', () => {
    wrapper.find('#revoke-admin').simulate('click');
    expect(props.revokeAdmin).toHaveBeenCalled();
  });
});
