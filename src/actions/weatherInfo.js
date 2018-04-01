import * as ActionTypes from './types';
import * as WeatherApi from '../api/weather';
import {add as addCity} from './cities';

function receiveWeatherInfo(city, info) {
  return {
    type: ActionTypes.RECEIVE_WEATHER_INFO,
    city,
    info
  };
}

function fetchWeatherInfo(city) {
  return {
    type: ActionTypes.FETCH_WEATHER_INFO,
    city
  };
}

function fetchWeatherInfoFailed(city, error) {
  return {
    type: ActionTypes.FETCH_WEATHER_INFO_FAILED,
    city,
    error
  };
}

export function addAndFetchForCityIfNecessary(city) {
  return function(dispatch, getState) {
    const shouldFetch = !getState().weatherByCity[city.toUpperCase()];
    if (!shouldFetch) {
      dispatch(addCity(city));
      return Promise.resolve();
    }
    dispatch(fetchWeatherInfo(city));
    const promise = WeatherApi.getWeatherForCity(city);
    promise.then(
      response => {
        dispatch(receiveWeatherInfo(city, response));
      },
      error => {
        dispatch(fetchWeatherInfoFailed(city, error));
      }
    );
    dispatch(addCity(city));
    return promise;
  };
}
