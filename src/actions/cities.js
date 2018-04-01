import * as ActionTypes from './types';

export function add(city) {
  return {
    type: ActionTypes.ADD_CITY,
    city
  };
}
