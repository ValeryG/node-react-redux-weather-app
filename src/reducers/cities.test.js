import citiesReducer from './cities';

const initialState = ['SEATTLE', 'MINNEAPOLIS'];

describe('Cities reducer', () => {
  it('should return initial state if action is not supported', () => {
    expect(citiesReducer(undefined, {type: 'hi!'})).toEqual(initialState);
  });
  it('should add a new city in upper case to the end of the array', () => {
    const city = 'Vancouver';
    expect(citiesReducer(initialState, {type: 'ADD_CITY', city})).toEqual([
      ...initialState,
      city.toUpperCase()
    ]);
  });
  it('should not add new city if it exists in state already ignoring case', () => {
    const city = 'seAtTle';
    expect(citiesReducer(initialState, {type: 'ADD_CITY', city})).toEqual(initialState);
  });
  it('should remove a city ignoring its case', () => {
    const city = 'MinNeaPOliS';
    expect(citiesReducer(initialState, {type: 'REMOVE_CITY', city})).toEqual(['SEATTLE']);
  });
});
