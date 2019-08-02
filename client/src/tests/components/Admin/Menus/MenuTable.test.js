import React from 'react';
import { mount } from 'enzyme';
import ReactStars from 'react-stars';
import { MenuTable, mapStateToProps } from '../../../../components/Admin/Menus/MenuTable';
import menuList from '../../../__mocks__/mockMenuList';
import engagements from '../../../__mocks__/mockEngagements';


describe('Menu Table Component', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      engagements,
      menus: { menuList },
      showAddModal: jest.fn(),
      showDeleteModal: jest.fn(),
      rateVendor: jest.fn(() => Promise.resolve())
    };
    wrapper = mount(<MenuTable {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('call showAddModal on click edit', () => {
    const spy = jest.spyOn(wrapper.instance().props, 'showAddModal');
    wrapper.find('.edit-menu').at(0).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('call showDeleteModal on click edit', () => {
    const spy = jest.spyOn(wrapper.instance().props, 'showDeleteModal');
    wrapper.find('.delete-menu').at(0).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('shows menus for a user', () => {
    wrapper.setProps({
      preview: true,
    });
    expect(wrapper.find('.menu-header').text()).toEqual('Available Menus');
  });

  it('renders EmptyContent when there are no menus', () => {
    wrapper.setProps({
      preview: true,
      menus: { menuList: [] },
      engagements: [],
    });
    expect(wrapper.find('.empty-content')).toBeTruthy();
  });
  it('shows loader', () => {
    wrapper.setProps({
      menus: { menuList: [], isLoading: true },
    });
    expect(wrapper.find('.loader-container')).toBeTruthy();
  });

  it('should toggle Rating Modal', () => {
    wrapper.setProps({ preview: true });
    wrapper.find('.rate-vendor-button').simulate('click');
    wrapper.setProps({ isFetching: true });
  });

  it('should rate a vendor', () => {
    wrapper.setProps({ preview: true });
    wrapper.setProps({ isFetching: false });
    const reactStar = wrapper.find(ReactStars);
    const rate = reactStar.find('span');
    rate.at(1).simulate('click', '');
    wrapper.find('.modal-comment')
      .simulate('change', { target: { value: "Vendor was organized :/" } });
    wrapper.find('#rating-form')
      .simulate('submit', { preventDefault: jest.fn() });
  });


  describe('mapStateToProps', () => {
    it('maps engagements from props to state', () => {
      const initialState = {
        allEngagements: { engagements: { engagements: [engagements[1]] } },
        allVendors: { isLoading: false }
      };
      expect(mapStateToProps(initialState).engagements.length).toEqual(1);
    });
  });
});
