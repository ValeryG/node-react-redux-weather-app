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

const LabelAndValue = ({label, value}) => {
  return (
    <div>
      <label>{label} </label><span>{value}</span>
    </div>
  );
};

LabelAndValue.propTypes = {
  label: PropTypes.node,
  value: PropTypes.node
};

const Weather = ({onRemove, weatherInfo}) => {
  const weatherData = weatherInfo.data ? weatherInfo.data.weather[0] : null;
  const weatherDetails = weatherInfo.data ? weatherInfo.data.main : null;
  return (
    <div style={{marginBottom: '2em'}}>
      <div>
        <button onClick={onRemove}>Remove</button>
      </div>
      {weatherInfo.error && <div>
        {JSON.stringify(weatherInfo.error)}
      </div>}
      {weatherInfo.data &&
        <div>
          <div>
            <div>
              <h2>{weatherData.main}</h2>
              <h3>{weatherData.description}</h3>
            </div>
            <div>
              <img src={`${ICON_BASE_URL}${weatherData.icon}.png`} />
            </div>
            <div>
              <LabelAndValue
                label="Current Temperature"
                value={`${weatherDetails.temp} degrees`} />
              <LabelAndValue
                label="Pressure"
                value={`${weatherDetails.pressure} hPa`} />
              <LabelAndValue
                label="Humidity"
                value={`${weatherDetails.humidity} %`} />
              <LabelAndValue
                label="Min"
                value={`${weatherDetails.temp_min} degrees`} />
              <LabelAndValue
                label="Max"
                value={`${weatherDetails.temp_max} degrees`} />
            </div>
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
      <div><h1>{city}</h1></div>
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
