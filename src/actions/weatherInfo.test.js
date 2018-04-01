import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as weatherInfoActions from './weatherInfo';
import * as weatherApi from '../api/weather';

const mockStore = configureMockStore([thunk]);

jest.mock('../api/weather');

let store;

describe('weatherInfo actions', () => {
  beforeEach(() => {
    store = mockStore({
      weatherByCity: {
        'MONTREAL': {
        }
      }
    });
    weatherApi.getWeatherForCity.mockClear();
  });
  describe('addAndFetchForCityIfNecessary()', () => {
    it('should call weather API and dispatch action with response', () => {
      const response = {
        main: {
          temp: 277.14,
          pressure: 993,
          humidity: 80
        }
      };
      const city = 'Vancouver';
      weatherApi.getWeatherForCity.mockResolvedValue(response);

      return store.dispatch(weatherInfoActions.addAndFetchForCityIfNecessary(city)).then(() => {
        expect(store.getActions()).toEqual([
          {
            type: 'FETCH_WEATHER_INFO',
            city
          },
          {
            type: 'ADD_CITY',
            city
          },
          {
            type: 'RECEIVE_WEATHER_INFO',
            city,
            info: response
          }
        ]);
        expect(weatherApi.getWeatherForCity).toBeCalledWith(city);
      });
    });
    it('should dispatch failed action if API call fails', () => {
      const error = {
        response: {
        }
      };
      const city = 'Montreal';
      weatherApi.getWeatherForCity.mockRejectedValue(error);
      return store.dispatch(weatherInfoActions.addAndFetchForCityIfNecessary(city)).catch(() => {
        expect(store.getActions()).toEqual([
          {
            type: 'FETCH_WEATHER_INFO',
            city
          },
          {
            type: 'FETCH_WEATHER_INFO_FAILED',
            city,
            error
          }
        ]);
        expect(weatherApi.getWeatherForCity).toBeCalledWith(city);
      });
    });
    it('should not dispatch a fetch if adding a city already in store', () => {
      const city = 'monTreAl';
      return store.dispatch(
        weatherInfoActions.addAndFetchForCityIfNecessary(city)
      ).then(() => {
        expect(store.getActions()).toEqual([
          {
            type: 'ADD_CITY',
            city
          }
        ]);
      });
    });
  });
});
