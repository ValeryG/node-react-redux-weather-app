import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {remove} from '../actions/cities';

import LoadingWidget from './LoadingWidget';
import WeatherInfo from './WeatherInfo';

const CityContainer = ({city, removeCity, weatherByCity}) => {
  const weatherForCity = weatherByCity[city];
  return (
    <div>
      {weatherForCity.fetching && <LoadingWidget />}
      {!weatherForCity.fetching && <WeatherInfo
        weatherInfo={weatherForCity}
        city={city} />}
    </div>
  );
};

CityContainer.propTypes = {
  city: PropTypes.string.isRequired,
  weatherByCity: PropTypes.object.isRequired,
  removeCity: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    weatherByCity: state.weatherByCity
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeCity: function(city) {
      dispatch(remove(city));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityContainer);
