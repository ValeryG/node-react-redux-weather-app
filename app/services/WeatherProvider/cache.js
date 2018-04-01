const NodeCache = require('node-cache');

const TIME_TO_LIVE_SECONDS = 10 * 60;
const cache = new NodeCache({
  stdTTL: TIME_TO_LIVE_SECONDS
});

module.exports.saveForCity = function(city, weatherInfo) {
  cache.set(city, weatherInfo);
};

module.exports.getForCity = function(city) {
  return cache.get(city);
};
