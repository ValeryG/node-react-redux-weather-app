const WeatherCache = require('./cache');
const Api = require('../api');

const cache = new WeatherCache();

module.exports.getWeatherForCity = function(city) {
  return new Promise((resolve, reject) => {
    const weather = cache.getWeatherForCity(city);
    if (!weather) {
      Api.getWeatherForCity(city).then(
        response => {
          cache.cacheForCity(city, response.body);
          resolve(response.body);
        },
        error => {
          reject(error.response.body);
        }
      )
    } else {
      console.log('Was in cache!!!');
      resolve(weather);
    }
  });
}
