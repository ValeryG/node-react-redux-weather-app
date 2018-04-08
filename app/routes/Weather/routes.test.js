const WeatherRouter = require('./routes');

const WeatherProvider = require('../../services/WeatherProvider');
jest.mock('../../services/WeatherProvider');

const req = {
  params: {
    name: 'Vancouver'
  }
};

describe('Weather router test', () => {
  describe('get city', () => {
    it('should get weather info for city and respond with json', done => {
      const data = {
        temperature: 101
      };
      const res = {
        status: status => {
          return {
            json: jest.fn(json => {
              expect(status).toEqual(200);
              expect(json).toEqual(data);
              done();
            })
          };
        }
      };
      WeatherProvider.getForCity.mockResolvedValue(data);
      WeatherRouter.get(req, res);
    });
    it('should get weather info for city and respond with 404 error', done => {
      const message = 'City not found';
      const status = 404;
      const error = {
        status,
        response: {
          body: {
            message
          }
        }
      };
      const res = {
        status: status => {
          return {
            json: jest.fn(json => {
              expect(status).toEqual(404);
              expect(json).toEqual({ message });
              done();
            })
          };
        }
      };
      WeatherProvider.getForCity.mockRejectedValue(error);
      WeatherRouter.get(req, res);
    });
    it('should get weather info for city and with 500 error', done => {
      const message = 'City not found';
      const status = 400;
      const error = {
        status,
        response: {
          body: {
            message
          }
        }
      };
      const res = {
        status: status => {
          return {
            json: jest.fn(json => {
              expect(status).toEqual(500);
              expect(json).toEqual({
                message: 'Error making request for weather info. Please try again later'
              });
              done();
            })
          };
        }
      };
      WeatherProvider.getForCity.mockRejectedValue(error);
      WeatherRouter.get(req, res);
    });
  });
});
