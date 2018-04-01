const request = require('superagent');

function createQueryWithToken(query) {
  return Object.assign({}, query, {
    APPID: process.env['WEATHER_API_KEY']
  });
}

module.exports.getJson = function(address, query) {
  query = createQueryWithToken(query);
  return new Promise((resolve, reject) => {
    request
      .get(address)
      .query(query)
      .accept('application/json')
      .end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  });
};
