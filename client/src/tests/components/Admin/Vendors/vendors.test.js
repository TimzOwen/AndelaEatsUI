import React from 'react';
import { shallow } from 'enzyme';
import { Vendors, mapStateToProps } from
  '../../../../components/Admin/Vendors/Vendors';
import * as inputValidations from '../../../../helpers/inputValidation';

describe.only('Unit test for the Vendor component', () => {
  const props = {
    fetchVendors: () => jest.fn(),
    suspendVendor: () => jest.fn(),
    isLoading: false,
    isCreating: false,
    isSuspending: false,
    isUpdating: false,
    createVendor: () => jest.fn(),
    updateVendor: () => jest.fn(),
    vendors: [],
  };
  describe('unit test for the formValidation method', () => {
    it('should call handleSubmit when all form fields are valid', () => {
      const wrapper = shallow(<Vendors {...props} />);
      wrapper.setState({ tel: '+234'});
      const spiedSubmitMethod = jest.spyOn(wrapper.instance(), 'handleSubmit').mockReturnValueOnce(true);
      jest.spyOn(inputValidations, 'default').mockReturnValueOnce({ isEmpty: true });
      const event = { preventDefault: () => jest.fn() };
      wrapper.instance().formValidation(event);
      wrapper.update();
      expect(spiedSubmitMethod.mock.calls.length).toBe(1);
    });
    it('should set the "errors" state when any form field has invalid values', () => {
      props.isLoading = true;
      const wrapper = shallow(<Vendors {...props} />);
      expect(wrapper.state('errors')).toEqual({});
      jest.spyOn(inputValidations, 'default').mockReturnValueOnce({ isEmpty: false, errors: 'some validation errors' });
      const spiedSubmitMethod = jest.spyOn(wrapper.instance(), 'handleSubmit').mockReturnValueOnce(true);
      const event = { preventDefault: () => jest.fn() };
      wrapper.instance().formValidation(event);
      wrapper.update();
      expect(wrapper.state('errors')).toEqual('some validation errors');
      expect(spiedSubmitMethod.mock.calls.length).toBe(0);
    });
    it('should map state to props correctly', () => {
      const appState = {
        allVendors: {
          isLoading: '',
          isCreating: '',
          isSuspending: '',
          isUpdating: '',
          vendors: '',
        }
      };
      const expectedComponentState = { ...appState.allVendors };
      const ComponentState = mapStateToProps(appState);
      expect(ComponentState).toEqual(expectedComponentState);
    });
  });
});