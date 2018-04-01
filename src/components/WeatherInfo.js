import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {remove} from '../actions/cities';

const WeatherInfo = ({city, removeCity, weatherByCity}) => {
  return (
    <div>
      <div>{city}</div>
      <div>
        <button onClick={ function() { removeCity(city); }}>Remove</button>
      </div>
      <div>
        {JSON.stringify(weatherByCity[city])}
      </div>
    </div>
  );
};

WeatherInfo.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfo);
