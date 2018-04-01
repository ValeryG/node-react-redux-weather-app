const RestApi = require('./restApi');
const logger = require('../../logger');

const API_ADDRESS = 'api.openweathermap.org/data/2.5/weather';

module.exports.getForCity = function(city) {
  return new Promise((resolve, reject) => {
    RestApi.getJson(API_ADDRESS, { q: city }).then(response => {
      resolve(response);
    }, error => {
      logger.warn(`Error of status ${error.status} received for weather info`,
        { message: error.response.body.message });
      reject(error);
    });
  });
};
