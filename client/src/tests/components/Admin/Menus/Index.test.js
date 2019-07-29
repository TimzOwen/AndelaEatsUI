/* eslint-disable no-undef */

import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import {
  Menus,
  mapStateToProps
} from '../../../../components/Admin/Menus/Index';
import menu from '../../../__mocks__/mockMenuList';
import engagement from '../../../__mocks__/mockEngagements';
import Loader from '../../../../components/common/Loader/Loader';


const menusState = {
  error: {
    status: false,
    message: null
  },
  isLoading: false,
  menuList: [
    menu[0],
  ],
  vendorEngagements: [{
    vendorId: 1,
    vendor: { name: 'Tasty', id: 1 },
    startDate: "Fri, 07 Dec 2018 00:00:00 GMT",
    endDate: "Fri, 14 Dec 2018 00:00:00 GMT"
  }],
  isDeleting: false,
};

describe('Admin: Menu Component', () => {
  let wrapper;

  const props = {
    menus: { ...menusState },
    fetchMenus: jest.fn(() => Promise.resolve()),
    fetchVendorEngagements: jest.fn(),
    fetchMealItems: jest.fn(),
    createMenu: jest.fn(() => Promise.resolve()),
    editMenu: jest.fn(() => Promise.resolve()),
    deleteMenuItem: jest.fn(() => Promise.resolve()),
    isLoading: false,
    fetchUpcomingEngagements: jest.fn(),
    upComingEngagements: [...menusState],
  };

  beforeEach(() => {
    wrapper = shallow(
      <Menus {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('should render loader', () => {
    wrapper.setProps({
      ...props,
      menus: {
        ...menusState,
        isLoading: true,
      }
    });

    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it('should render error', () => {
    wrapper.setProps({
      ...props,
      menus: {
        ...menusState,
        isLoading: false,
        error: {
          status: true,
          message: 'Error message'
        }
      }
    });

    expect(wrapper.find('.no-content').length).toEqual(1);
  });

  it('should call showAddModal method when editing a menu', () => {
    expect(wrapper.instance().state.displayModal).toBeFalsy();
    wrapper.find('#add-menu').simulate('click');
    expect(wrapper.instance().state.displayModal).toBeTruthy();
  });

  it('should call closeModal method', () => {
    const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal');
    wrapper.update();
    wrapper.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should call handleSubmit method on creating a menu', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.update();
    wrapper.instance().handleSubmit();
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should call handleSubmit method on editing a menu', () => {
    wrapper.setState({
      editMenu: true,
    });
    wrapper.instance().showAddModal(menusState.menuList[0], true);
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.update();
    wrapper.instance().handleSubmit();
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should display menu on clicking viewMenu', () => {
    expect(wrapper.instance().state.displayModal).toBe(false);
    const handleViewMenuspy = jest.spyOn(wrapper.instance(), 'handleViewMenu');
    const button = wrapper.find('#view-menu').simulate('click');
  });

  it('should call deleteMenu on clicking delete', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showDeleteModal');
    wrapper.instance().showDeleteModal({});
    expect(spy).toHaveBeenCalled();
  });

  it('should show error if endDate is greater than startDate', () => {
    wrapper.setState({
      endDate: moment(),
      startDate: moment().add(1, 'days'),
    });
    wrapper.find('#view-menu').simulate('click');
    expect(wrapper.find('.Toastify__toast--error')).toBeTruthy();
  });

  it('changes date', () => {
    wrapper.find(DatePicker).at(0).simulate('change', '2019-02-03');
    expect(wrapper.instance().state.startDate).toEqual('2019-02-03');
    wrapper.find(DatePicker).at(1).simulate('change');
  });

  it('calls delete menu', () => {
    wrapper.instance().deleteMenu(1);
    expect(wrapper.find('.Toastify__toast Toastify__toast--success')).toBeTruthy();
  });

  describe('mapStateToProps', () => {
    it('mapStateToProps', () => {
      const initialState = {
        menus: menu,
        allEngagements: { engagements: engagement }
      };

      expect(mapStateToProps(initialState).menus).toEqual(menu);
    });
  });
});
