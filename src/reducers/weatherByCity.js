import * as ActionTypes from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_WEATHER_INFO:
      return Object.assign({}, state, {
        [action.city]: action.info
      });
    default:
      return state;
  }
}
