import React from 'react';
import PropTypes from 'prop-types';

const ICON_BASE_URL = 'http://openweathermap.org/img/w/';

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

const ErrorInfo = ({error}) => {
  if (!error) {
    return null;
  }
  return (
    <div>
      {JSON.stringify(error)}
    </div>
  );
};

ErrorInfo.propTypes = {
  error: PropTypes.object
};

const WeatherDetails = ({weather, main}) => {
  return (
    <div>
      <div>
        <div>
          <h2>{weather.main}</h2>
          <h3>{weather.description}</h3>
        </div>
        <div>
          <img src={`${ICON_BASE_URL}${weather.icon}.png`} />
        </div>
        <div>
          <LabelAndValue
            label="Current Temperature"
            value={`${main.temp} degrees`} />
          <LabelAndValue
            label="Pressure"
            value={`${main.pressure} hPa`} />
          <LabelAndValue
            label="Humidity"
            value={`${main.humidity} %`} />
          <LabelAndValue
            label="Min"
            value={`${main.temp_min} degrees`} />
          <LabelAndValue
            label="Max"
            value={`${main.temp_max} degrees`} />
        </div>
      </div>
    </div>
  );
};

WeatherDetails.propTypes = {
  main: PropTypes.object,
  weather: PropTypes.object
};

const WeatherInfo = ({onRemove, weatherInfo}) => {
  const weather = weatherInfo.data ? weatherInfo.data.weather[0] : null;
  const main = weatherInfo.data ? weatherInfo.data.main : null;
  return (
    <div style={{marginBottom: '2em'}}>
      <div>
        <button onClick={onRemove}>Remove</button>
      </div>
      <ErrorInfo
        error={weatherInfo.error} />
      <WeatherDetails
        weather={weather}
        main={main} />
    </div>
  );
};

WeatherInfo.propTypes = {
  weatherInfo: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default WeatherInfo;
