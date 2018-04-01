const weatherProvider = require('./index');
const Api = require('../../api');
const Cache = require('./cache');

jest.mock('../../api');
jest.mock('./cache');

describe('Weather Provider Service', () => {
  it('should get weather data from API if not in cache', () => {
    const city = 'Vancouver';
    const weatherInfo = {
      city,
      status: 'Raining'
    };
    const mockCacheGet = jest.fn(() => {
      return undefined;
    });
    const mockCacheSet = jest.fn(() => {});
    const mockApi = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          body: weatherInfo
        });
      });
    });
    Api.getForCity.mockImplementation(mockApi);
    Cache.getForCity.mockImplementation(mockCacheGet);
    Cache.saveForCity.mockImplementation(mockCacheSet);

    return weatherProvider.getForCity(city).then(response => {
      expect(mockCacheGet).toBeCalledWith(city);
      expect(mockApi).toBeCalledWith(city);
      expect(mockCacheSet).toBeCalledWith(city, weatherInfo);
      expect(response).toEqual(weatherInfo);
    });
  });
});
