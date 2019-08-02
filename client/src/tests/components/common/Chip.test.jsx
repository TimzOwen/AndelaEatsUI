import React from 'react';
import { shallow } from 'enzyme';
import Chip from '../../../components/common/Chip/index';

/* 
global jest 
expect 
*/
describe('Chips Component', () => {
  const props = {
    deleteItem: jest.fn(),
    id: "1",
    name: "Waiter",
  };

  const wrapper = shallow(<Chip {...props} />);

  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call deleteItem function', () => {
    const closeButton = wrapper.find('.closebtn');
    expect(closeButton.length).toEqual(1);
  });
});
