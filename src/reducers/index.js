import {combineReducers} from 'redux';
import weatherByCity from './weatherByCity';
import cities from './cities';
import selectedCity from './selectedCity';

export default combineReducers({
  weatherByCity,
  cities,
  selectedCity
});
