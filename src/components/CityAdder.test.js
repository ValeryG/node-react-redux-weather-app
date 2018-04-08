import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {CityAdder} from './CityAdder';

Enzyme.configure({ adapter: new Adapter() });

const addedCity = 'VANCOUVER';

function setup() {
  const props = {
    addCity: jest.fn(),
    selectCity: jest.fn(),
    cities: [addedCity]
  };
  const enzymeWrapper = mount(<CityAdder {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('CityAdder component', () => {
  it('should add city and select it if it has not already been added', () => {
    const {enzymeWrapper, props} = setup();
    const newCity = 'montreal';
    enzymeWrapper.find('input').simulate('change', {target: {value: newCity}});
    const preventDefault = jest.fn();
    enzymeWrapper.find('form').simulate('submit', {preventDefault});

    expect(props.addCity).toHaveBeenCalledWith(newCity);
    expect(props.selectCity).toHaveBeenCalledWith(newCity);
    expect(preventDefault).toHaveBeenCalled();
    expect(enzymeWrapper.state().city).toEqual('');
    expect(enzymeWrapper.state().error).toEqual('');
  });

  it('should not add city if it has been added already', () => {
    const {enzymeWrapper, props} = setup();
    const newCity = 'vancouver';
    enzymeWrapper.find('input').simulate('change', {target: {value: newCity}});
    const preventDefault = jest.fn();
    enzymeWrapper.find('form').simulate('submit', {preventDefault});

    const expectedError = `${newCity} has already been added`;

    expect(props.addCity).toHaveBeenCalledTimes(0);
    expect(props.selectCity).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.state().city).toEqual(newCity);
    expect(enzymeWrapper.state().error).toEqual(expectedError);
    expect(enzymeWrapper.find('div').at(1).text()).toEqual(expectedError);
  });
});
