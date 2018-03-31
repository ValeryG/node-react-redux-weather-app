import fetch from 'cross-fetch';

export function getWeatherForCity(city) {
  return fetch(
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  )
}
