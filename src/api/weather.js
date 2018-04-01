import * as restApi from './restHelper';

const endPoint = '/api/v1/weather';

export function getWeatherForCity(city) {
  const address = `${endPoint}/city/${city}`;
  return restApi.getJson(address);
}
