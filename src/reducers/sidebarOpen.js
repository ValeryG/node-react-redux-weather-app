import * as ActionTypes from '../actions/types';

export default function(state = false, action) {
  switch(action.type) {
    case ActionTypes.TOGGLE_SIDEBAR:
      return !state;
    default:
      return state;
  }
}
