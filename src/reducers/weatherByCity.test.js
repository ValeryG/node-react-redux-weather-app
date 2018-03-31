import fixture from './weatherByCity';

describe('weatherByCity reducer', () => {
  it('should return initial state if action is not supported', () => {
    expect(fixture(undefined, {type: 'hello'})).toEqual({});
  });
  it('should receive weather info by city', () => {
    const initialState = {
      london: {
        temperature: 32
      }
    };
    expect(
      fixture(initialState, {
        type: 'RECEIVE_WEATHER_INFO',
        city: 'vancouver',
        info: {
          temperature: 24
        }
      })
    ).toEqual({
      ...initialState,
      vancouver: {
        temperature: 24
      }
    });
  });
});
