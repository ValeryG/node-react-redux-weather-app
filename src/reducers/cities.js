import * as ActionTypes from '../actions/types';

export default function(state = ['SEATTLE', 'MINNEAPOLIS'], action) {
  switch(action.type) {
    case ActionTypes.ADD_CITY:
      let city = action.city.toUpperCase();
      if (!state.includes(city)) {
        return [...state, city];
      }
      return state;
    case ActionTypes.REMOVE_CITY:
      let targetCity = action.city.toLowerCase();
      return state.filter(city => {
        return city.toLowerCase() !== targetCity;
      });
    default:
      return state;
  }
}
