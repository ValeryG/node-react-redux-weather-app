import * as ActionTypes from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_WEATHER_INFO:
      return Object.assign({}, state, {
        [action.city.toUpperCase()]: {
          fetching: false,
          error: null,
          data: action.info
        }
      });
    case ActionTypes.FETCH_WEATHER_INFO:
      return Object.assign({}, state, {
        [action.city.toUpperCase()]: {
          fetching: true,
          error: null,
          data: null
        }
      });
    case ActionTypes.FETCH_WEATHER_INFO_FAILED:
      return Object.assign({}, state, {
        [action.city.toUpperCase()]: {
          fetching: false,
          error: action.error,
          data: null
        }
      });
    default:
      return state;
  }
}
