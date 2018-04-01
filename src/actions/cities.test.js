import * as CitiesActions from './cities';

describe('city actions', () => {
  it('should create an action with type ADD_CITY', () => {
    const city = 'Vancouver';
    expect(CitiesActions.add(city)).toEqual({
      type: 'ADD_CITY',
      city
    });
  });
  it('should create an action with type REMOVE_CITY', () => {
    const city = 'Vancouver';
    expect(CitiesActions.remove(city)).toEqual({
      type: 'REMOVE_CITY',
      city
    });
  });
});
