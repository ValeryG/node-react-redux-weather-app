import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {remove} from '../actions/cities';

const ICON_BASE_URL = 'http://openweathermap.org/img/w/';

const StillLoading = () => {
  return (
    <div>
      <p>Please wait...</p>
    </div>
  );
};

const Weather = ({onRemove, weatherInfo}) => {
  return (
    <div>
      <div>
        <button onClick={onRemove}>Remove</button>
      </div>
      {weatherInfo.error && <div>
        {JSON.stringify(weatherInfo.error)}
      </div>}
      {weatherInfo.data &&
        <div>
          {JSON.stringify(weatherInfo.data)}
          <div>
            <img src={`${ICON_BASE_URL}${weatherInfo.data.weather[0].icon}.png`} />
          </div>
        </div>
      }
    </div>
  );
};

Weather.propTypes = {
  weatherInfo: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
};

const WeatherInfo = ({city, removeCity, weatherByCity}) => {
  const weatherForCity = weatherByCity[city];
  return (
    <div>
      <div>{city}</div>
      {weatherForCity.fetching && <StillLoading />}
      {!weatherForCity.fetching && <Weather
        weatherInfo={weatherForCity}
        onRemove={function() { removeCity(city); }} />}
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
