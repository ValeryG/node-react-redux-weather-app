import {combineReducers} from 'redux';
import weatherByCity from './weatherByCity';
import cities from './cities';
import selectedCity from './selectedCity';
import sidebarOpen from './sidebarOpen';

export default combineReducers({
  weatherByCity,
  cities,
  selectedCity,
  sidebarOpen
});
