import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {remove} from '../actions/cities';

import LoadingWidget from './LoadingWidget';
import WeatherInfo from './WeatherInfo';
import ErrorWidget from './ErrorWidget';

const CityContainer = ({city, removeCity, weatherByCity}) => {
  const weatherForCity = weatherByCity[city];
  if (weatherForCity.fetching) {
    return <LoadingWidget />;
  }
  if (weatherForCity.error) {
    return <ErrorWidget error={weatherForCity.error} />;
  }
  return (
    <WeatherInfo
      weatherInfo={weatherForCity.data}
      city={city} />
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
