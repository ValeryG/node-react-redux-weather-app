import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {remove} from '../actions/cities';

import LoadingWidget from './LoadingWidget';
import WeatherInfo from './WeatherInfo';
import ErrorWidget from './ErrorWidget';

function renderChild(city, weatherForCity) {
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
}

export const CityContainer = ({city, weatherByCity}) => {
  return (
    <div className="city">
      <div className="header"><h1>{city}</h1></div>
      {renderChild(city, weatherByCity[city])}
    </div>
  );
};

CityContainer.propTypes = {
  city: PropTypes.string.isRequired,
  weatherByCity: PropTypes.object.isRequired
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
