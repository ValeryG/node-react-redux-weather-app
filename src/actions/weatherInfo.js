import * as ActionTypes from './types';
import * as WeatherApi from '../api/weather';

function receiveWeatherInfo(city, info) {
  return {
    type: ActionTypes.RECEIVE_WEATHER_INFO,
    city,
    info
  }
}

export function fetchForCity(city) {
  return function(dispatch) {
    return WeatherApi.getWeatherForCity(city).then(
      response => {
        dispatch(receiveWeatherInfo(city, response));
      }
    );
  }
}
