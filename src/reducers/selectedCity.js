import * as ActionTypes from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case ActionTypes.SELECT_CITY:
      return action.city.toUpperCase();
    case ActionTypes.REMOVE_CITY:
      return action.city.toUpperCase() === state ? null : state;
    default:
      return state;
  }
};
