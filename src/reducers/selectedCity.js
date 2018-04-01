import * as ActionTypes from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case ActionTypes.SELECT_CITY:
      return action.city.toUpperCase();
    default:
      return state;
  }
};
