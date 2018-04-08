const RestApi = require('./restApi');
const Logger = require('../../logger');

jest.mock('./restApi');
jest.mock('../../logger');

const WeatherApi = require('./index');

const apiEndpoint = 'api.openweathermap.org/data/2.5/weather';

describe('Backend Weather API', () => {
  it('should getJson from API with proper params and resolve', () => {
    const mockResponse = {
      body: {
        data: {}
      }
    };
    RestApi.getJson.mockResolvedValue(mockResponse);

    const city = 'Vancouver';
    return WeatherApi.getForCity(city).then(response => {
      expect(response).toEqual(mockResponse);
      expect(RestApi.getJson).toHaveBeenCalledWith(apiEndpoint, { q: city, units: 'imperial' });
    });
  });

  it('should getJson from API with proper params and reject with error', () => {
    const status = 404;
    const message = 'Error occurred';
    const mockResponse = {
      response: {
        body: {
          message
        }
      },
      status
    };
    RestApi.getJson.mockRejectedValue(mockResponse);

    const city = 'Vancouver';
    return WeatherApi.getForCity(city).catch(error => {
      expect(error).toEqual(mockResponse);
      expect(RestApi.getJson).toHaveBeenCalledWith(apiEndpoint, { q: city, units: 'imperial' });
      expect(Logger.warn).toHaveBeenCalledWith(
        `Error of status ${status} received for weather info`,
        { message }
      );
    });
  });
});
