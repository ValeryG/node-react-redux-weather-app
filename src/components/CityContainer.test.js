import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {CityContainer} from './CityContainer';

import LoadingWidget from './LoadingWidget';
import WeatherInfo from './WeatherInfo';
import ErrorWidget from './ErrorWidget';

Enzyme.configure({ adapter: new Adapter() });

function setup(city, weatherByCity) {
  const props = {
    removeCity: jest.fn(),
    weatherByCity,
    city
  };
  const enzymeWrapper = mount(<CityContainer {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('CityContainer component', () => {
  it('should display LoadingWidget component if the current city is being fetched', () => {
    const city = 'VANCOUVER';
    const weatherByCity = {
      [city]: {
        fetching: true,
        error: null,
        data: null
      }
    };
    const {enzymeWrapper} = setup(city, weatherByCity);

    expect(enzymeWrapper.childAt(0).childAt(1).matchesElement(
      <LoadingWidget />
    )).toBe(true);
    expect(enzymeWrapper.childAt(0).children().length).toEqual(2);
  });
  it('should display WeatherInfo component if data has been fetched successfully', () => {
    const city = 'VANCOUVER';
    const weatherByCity = {
      [city]: {
        fetching: false,
        error: null,
        data: {
          weather: [{}],
          main: {},
          wind: {},
          clouds: {}
        }
      }
    };
    const {enzymeWrapper} = setup(city, weatherByCity);

    expect(enzymeWrapper.childAt(0).childAt(1).matchesElement(
      <WeatherInfo city={city} weatherInfo={weatherByCity[city].data} />
    )).toBe(true);
    expect(enzymeWrapper.childAt(0).children().length).toEqual(2);
  });
  it('should display ErrorWidget if error occurred in fetching data', () => {
    const city = 'VANCOUVER';
    const errorMessage = 'Error occurred';
    const weatherByCity = {
      [city]: {
        fetching: false,
        error: {
          response: {
            body: {
              message: errorMessage
            }
          }
        },
        data: null
      }
    };
    const {enzymeWrapper} = setup(city, weatherByCity);

    expect(enzymeWrapper.childAt(0).childAt(1).matchesElement(
      <ErrorWidget error={weatherByCity[city].error} />
    )).toBe(true);
    expect(enzymeWrapper.childAt(0).children().length).toEqual(2);
  });
});
