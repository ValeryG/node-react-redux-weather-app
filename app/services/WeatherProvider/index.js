const WeatherCache = require('./cache');
const Api = require('../../api');

module.exports.getForCity = function(city) {
  return new Promise((resolve, reject) => {
    const weather = WeatherCache.getForCity(city);
    if (!weather) {
      Api.getForCity(city).then(
        response => {
          WeatherCache.saveForCity(city, response.body);
          resolve(response.body);
        },
        error => {
          reject(error);
        }
      );
    } else {
      resolve(weather);
    }
  });
};
