import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CityContainer from './CityContainer';
import CityList from './CityList';
import Navbar from './Navbar';

import * as weatherInfoActions from '../actions/weatherInfo';
import * as CitiesActions from '../actions/cities';

class HomeContainer extends React.Component {
  componentWillMount() {
    this.props.fetchWeatherForCity('Seattle');
    this.props.fetchWeatherForCity('Minneapolis');
    this.props.selectCity('Seattle');
  }
  render() {
    const selected = this.props.selectedCity;
    return (
      <div className="home">
        <Navbar />
        <CityList />
        <div className="city">
          {selected && <CityContainer city={selected} />}
        </div>
      </div>
    );
  }
};

HomeContainer.propTypes = {
  weatherByCity: PropTypes.object.isRequired,
  fetchWeatherForCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCity: PropTypes.string,
  selectCity: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    weatherByCity: state.weatherByCity,
    cities: state.cities,
    selectedCity: state.selectedCity
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWeatherForCity: function(city) {
      return dispatch(weatherInfoActions.addAndFetchForCityIfNecessary(city));
    },
    selectCity: function(city) {
      dispatch(CitiesActions.select(city));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
