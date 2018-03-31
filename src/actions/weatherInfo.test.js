import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as weatherInfoActions from './weatherInfo';
import * as weatherApi from '../api/weather';

const mockStore = configureMockStore([thunk]);

jest.mock('../api/weather');

describe('weatherInfo actions', () => {
  describe('fetchForCity()', () => {
    it('should call weather APII and dispatch action with response', () => {
      const response = {
        main: {
          temp: 277.14,
          pressure: 993,
          humidity: 80,
          temp_min: 276.15,
          temp_max: 278.15
        }
      };
      const store = mockStore({});
      const city = 'Vancouver';
      const mockApi = jest.fn(() => {
        return new Promise((resolve) => {
          resolve(response);
        });
      });
      weatherApi.getWeatherForCity.mockImplementation(mockApi);

      return store.dispatch(weatherInfoActions.fetchForCity(city)).then(() => {
        expect(store.getActions()).toEqual([{
          type: 'RECEIVE_WEATHER_INFO',
          city,
          info: response
        }]);
        expect(mockApi).toBeCalledWith(city);
      });
    });
  });
});
