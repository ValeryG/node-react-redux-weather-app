import * as ActionTypes from '../actions/types';

export default function(state = ['SEATTLE', 'MINNEAPOLIS'], action) {
  switch(action.type) {
    case ActionTypes.ADD_CITY:
      let city = action.city.toUpperCase();
      if (!state.includes(city)) {
        return [...state, city];
      }
      return state;
    default:
      return state;
  }
}
