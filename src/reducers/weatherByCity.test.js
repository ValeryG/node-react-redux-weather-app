import fixture from './weatherByCity';

describe('weatherByCity reducer', () => {
  it('should return initial state if action is not supported', () => {
    expect(fixture(undefined, {type: 'hello'})).toEqual({});
  });
  it('should receive weather info by city', () => {
    const city = 'VAncOUver';
    const initialState = {
      [city.toUpperCase()]: {
        fetching: true,
        error: null,
        data: null
      }
    };
    const info = {
      temperature: 24
    };
    expect(
      fixture(initialState, {
        type: 'RECEIVE_WEATHER_INFO',
        city,
        info
      })
    ).toEqual({
      ...initialState,
      [city.toUpperCase()]: {
        fetching: false,
        data: info,
        error: null
      }
    });
  });
  it('should set info for city to fetching', () => {
    const city = 'VanCoUver';
    expect(
      fixture({}, {
        type: 'FETCH_WEATHER_INFO',
        city
      })
    ).toEqual({
      [city.toUpperCase()]: {
        fetching: true,
        error: null,
        data: null
      }
    });
  });
  it('should set error if fetching failed', () => {
    const city = 'Vancouver';
    const initialState = {
      [city.toUpperCase()]: {
        fetching: true,
        error: null,
        data: null
      }
    };
    const error = {
      response: {}
    };
    expect(
      fixture(initialState, {
        type: 'FETCH_WEATHER_INFO_FAILED',
        city,
        error
      })
    ).toEqual({
      [city.toUpperCase()]: {
        fetching: false,
        error,
        data: null
      }
    });
  });
});
