const Wrapper = require('./wrapper');

const API_ADDRESS = 'api.openweathermap.org/data/2.5/weather';

module.exports.getWeatherForCity = function(city) {
  return new Promise((resolve, reject) => {
    Wrapper.getJson(API_ADDRESS, { q: city }).then(response => {
      resolve(response);
    }, error => {
      reject(error);
    });
  });
}
