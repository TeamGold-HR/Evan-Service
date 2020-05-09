/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../src/App';
import Occupants from '../src/Occupants';

// eslint-disable-next-line arrow-body-style
const mockEventGenerator = (string) => {
  return {
    target: {
      id: string,
    },
  };
};

describe('unit tests', () => {
  it('should render', () => {
    const occupants = shallow(<Occupants />);
    expect(occupants).toExist();
  });
  it('should call the increase function in app.jsx when a + button is clicked', () => {
    const wrapper = mount(<App />);
    const mock = jest.fn();
    wrapper.instance().increase = mock;
    wrapper.instance().forceUpdate();
    wrapper.find('#increase-adults').simulate('click', mockEventGenerator('increase-adults'));
    expect(mock).toBeCalled();
  });
  it('should call the decrease function in app.jsx when a - button is clicked', () => {
    const wrapper = mount(<App />);
    const mock = jest.fn();
    wrapper.instance().decrease = mock;
    wrapper.instance().forceUpdate();
    wrapper.find('#decrease-children').simulate('click', mockEventGenerator('decrease-children'));
    expect(mock).toBeCalled();
  });
});
