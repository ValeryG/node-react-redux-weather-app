const request = require('superagent');

module.exports.getJson = function(address, query) {
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
