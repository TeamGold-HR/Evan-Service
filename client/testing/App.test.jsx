import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App.jsx';

describe('unit tests', () => {
  it('should make an api call on component mount', () => {
    const app = shallow(<App />);
    expect(app).toExist();
  });
});

/*
it('should retrieve no more than 62 entries', () => {

};

)

it('should not make an api call with a listing that is greater than 99', () => {

};

)

it('should not make an api call with a listing that is less than 0', () => {

};

)

it('should not make an api call with a listing that is a string', () => {

};

)
*/