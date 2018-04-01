import * as ActionTypes from './types';

export function add(city) {
  return {
    type: ActionTypes.ADD_CITY,
    city
  };
}

export function remove(city) {
  return {
    type: ActionTypes.REMOVE_CITY,
    city
  };
};
