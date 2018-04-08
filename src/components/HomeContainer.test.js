import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {HomeContainer} from './HomeContainer';

Enzyme.configure({ adapter: new Adapter() });

function setup(selectedCity) {
  const props = {
    fetchWeatherForCity: jest.fn(),
    selectCity: jest.fn(),
    weatherByCity: {},
    selectedCity: selectedCity,
    cities: []
  };
  const enzymeWrapper = shallow(<HomeContainer {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('HomeContainer component', () => {
  it('should dispatch actions on mount', () => {
    const {props} = setup('');
    expect(props.fetchWeatherForCity).toHaveBeenCalledWith('Seattle');
    expect(props.fetchWeatherForCity).toHaveBeenCalledWith('Minneapolis');
    expect(props.selectCity).toHaveBeenCalledWith('Seattle');
  });

  it('should render city information if a city is selected', () => {
    const {enzymeWrapper} = setup('Vancouver');
    expect(enzymeWrapper.find('div').at(1).children().length).toBeGreaterThan(0);
  });

  it('should render not render city information if a city is not selected', () => {
    const {enzymeWrapper} = setup('');
    expect(enzymeWrapper.find('.city').children().length).toBe(0);
  });
});
