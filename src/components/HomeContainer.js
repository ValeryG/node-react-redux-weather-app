import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import WeatherInfo from './WeatherInfo';
import CityAdder from './CityAdder';

import * as weatherInfoActions from '../actions/weatherInfo';

class HomeContainer extends React.Component {
  componentWillMount() {
    this.props.fetchWeatherForCity('Seattle');
    this.props.fetchWeatherForCity('Minneapolis');
  }
  render() {
    return (
      <div>
        {this.props.cities.map(city => {
          return <WeatherInfo city={city} key={city} />;
        })}
        <CityAdder />
      </div>
    );
  }
};

HomeContainer.propTypes = {
  weatherByCity: PropTypes.object.isRequired,
  fetchWeatherForCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired
};

function mapStateToProps(state) {
  return {
    weatherByCity: state.weatherByCity,
    cities: state.cities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWeatherForCity: function(city) {
      return dispatch(weatherInfoActions.addAndFetchForCityIfNecessary(city));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
