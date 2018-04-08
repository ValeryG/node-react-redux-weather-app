import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {CityList} from './CityList';

Enzyme.configure({ adapter: new Adapter() });

const city = 'VANCOUVER';
const city2 = 'MONTREAL';
function setup(cities) {
  const props = {
    cities,
    selectCity: jest.fn(),
    removeCity: jest.fn(),
    sidebarOpen: false
  };
  const enzymeWrapper = shallow(<CityList {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('CityContainer component', () => {
  it('should render list item for each city', () => {
    const {enzymeWrapper} = setup([city, city2]);
    const items = enzymeWrapper.find('li');
    expect(items.length).toEqual(2);
    expect(items.at(0).find('button').at(0).text()).toEqual(city);
    expect(items.at(1).find('button').at(0).text()).toEqual(city2);
  });

  it('should select a city when its button is clicked', () => {
    const {enzymeWrapper, props} = setup([city, city2]);
    enzymeWrapper.find('li').at(0).find('button').at(0).simulate('click');

    expect(props.selectCity).toHaveBeenCalledWith(city);
  });

  it('should remove a city when its button is clicked', () => {
    const {enzymeWrapper, props} = setup([city, city2]);
    enzymeWrapper.find('.remove').at(0).simulate('click');

    expect(props.removeCity).toHaveBeenCalledWith(city);
  });

  it('should toggle open class on props change', () => {
    const {enzymeWrapper, props} = setup([city, city2]);
    expect(enzymeWrapper.is('.open')).toBe(false);
    enzymeWrapper.setProps(Object.assign({}, props, {sidebarOpen: true}));
    expect(enzymeWrapper.is('.open')).toBe(true);
  });
});
