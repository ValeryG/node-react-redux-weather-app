import * as ActionTypes from './types';
import * as WeatherApi from '../api/weather';

function receiveWeatherInfo(city, info) {
  return {
    type: ActionTypes.RECEIVE_WEATHER_INFO,
    city,
    info
  };
}

export function fetchForCity(city) {
  return function(dispatch) {
    const promise = WeatherApi.getWeatherForCity(city);
    promise.then(
      response => {
        dispatch(receiveWeatherInfo(city, response));
      }
    );
    return promise;
  };
}
