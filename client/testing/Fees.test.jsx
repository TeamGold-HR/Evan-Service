/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Fees from '../src/Fees';
import App from '../src/App';

// eslint-disable-next-line arrow-body-style
const mockEventGenerator = (string) => {
  return {
    target: {
      id: string,
    },
    preventDefault: () => {},
  };
};

describe('unit tests', () => {
  it('should render', () => {
    const fees = shallow(<Fees />);
    expect(fees).toMatchSnapshot();
  });
  it('should call toggleNode in App.jsx when a fee summary line is clicked', () => {
    const wrapper = mount(<App />);
    const mock = jest.fn();
    wrapper.instance().toggleNote = mock;
    wrapper.instance().forceUpdate();
    wrapper.find('#occupancy-click').simulate('click', mockEventGenerator('occupancy-click'));
    expect(mock).toHaveBeenCalled();
  });
  it('should call exit when an exit button is clicked', () => {
    const wrapper = mount(<App />);
    const mock = jest.fn();
    wrapper.instance().closeModal = mock;
    wrapper.instance().forceUpdate();
    wrapper.find('#rent-exit').simulate('click', mockEventGenerator('rent-exit'));
    expect(mock).toHaveBeenCalled();
  });
});
