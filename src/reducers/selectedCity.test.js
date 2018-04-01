import selectedCityReducer from './selectedCity';

describe('selectedCity reducer', () => {
  it('should return initial state if action is not supported', () => {
    expect(selectedCityReducer(undefined, {type: 'hello'})).toEqual(null);
  });
  it('should set selected city', () => {
    const city = 'VAncOUver';
    expect(
      selectedCityReducer('Montreal', {
        type: 'SELECT_CITY',
        city
      })
    ).toEqual(city.toUpperCase());
  });
});
