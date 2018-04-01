import {combineReducers} from 'redux';
import weatherByCity from './weatherByCity';
import cities from './cities';

export default combineReducers({
  weatherByCity,
  cities
});
