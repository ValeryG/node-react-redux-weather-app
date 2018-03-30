const NodeCache = require('node-cache');

const TIME_TO_LIVE_SECONDS = 10 * 60;

class WeatherCache {
  constructor() {
    this.cache = new NodeCache({
      stdTTL: TIME_TO_LIVE_SECONDS
    });
    this.cacheForCity = this.cacheForCity.bind(this);
  }
  cacheForCity(city, weatherInfo) {
    this.cache.set(city, weatherInfo)
  }
  getWeatherForCity(city) {
    return this.cache.get(city);
  }
}

module.exports = WeatherCache;
