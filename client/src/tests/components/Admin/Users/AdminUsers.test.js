/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Users, mapStateToProps } 
  from '../../../../components/Admin/Users/AdminUsers';

const props = {
  adminUsers: [{ name: 'miriam', email: "mim@gmail.com" }],
  message: "",
  userEmail: "",
  createAdminUser: jest.fn().mockImplementation(() => Promise.resolve()),
  getAllAdminUsers: jest.fn(),
  loading: false,
  displayRevokeModal: false,
  showRevokeModal: jest.fn(),
  closeRevokeModal: jest.fn(),
  closeModal: jest.fn(),
  revokeAdmin: jest.fn()
};

const wrapper = mount(<Users {...props} />);

const state = {
  emailAddress: '',
};

describe('Users Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loader component', () => {
    const loaderProps = { ...props, loading: true };
    const compWrapper = mount(<Users {...loaderProps} />);
    expect(compWrapper).toMatchSnapshot();
  });

  it('should render an empty component', () => {
    const emptyProps = { ...props, adminUsers: [] };
    const compWrapper = mount(<Users {...emptyProps} />);
    expect(compWrapper).toMatchSnapshot();
  });

  it('should handle submit', () => {
    const event = {
      target: {
        elements: {
          userEmail: {
            value: "miriam@gmail.com"
          },
        }
      },
      preventDefault: jest.fn(),
    };

    wrapper.update();
    wrapper.find('form').simulate('submit',
      event
    );

    expect(props.createAdminUser).toBeCalled();
  });

  it('should change email address', () => {
    wrapper.instance().onChange({ target: { name: 'emailAdress', value: 'welike.amos@gmail.com' } });
    expect(wrapper.instance().state.emailAddress).toEqual('welike.amos@gmail.com');
  });

  it('should open the revoke Admin modal when the button is clicked', () => {
    const event = {
      target: {
        preventDefault: jest.fn()
      }
    }; 
    
    wrapper.find('#delete-admin').simulate('click', event);
    const spy = jest.spyOn(wrapper.instance(), 'showRevokeModal');
    wrapper.instance().showRevokeModal({});
    expect(spy).toHaveBeenCalled();
  });

  it('should call revoke Admin', () => {
    wrapper.setProps({
      displayRevokeModal: true,
    }) 
    wrapper.find('#revoke-admin').simulate('click');
    expect(props.revokeAdmin).toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    it('should map Users to state', () => {
      const initialState = {
        user: {
          adminUsers: []
        }
      };
    
      expect(mapStateToProps(initialState).adminUsers).toEqual([]);
    });
  });
});
