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

const WeatherDetails = ({weather, main, other}) => {
  return (
    <div>
      <div className="header">
        <img src={`${ICON_BASE_URL}${weather.icon}.png`} />
        <h2>{weather.description} - {main.temp} degrees</h2>
      </div>
      <div className="main">
        <div className="column">
          <div>
            <h4>Stats</h4>
          </div>
          <LabelAndValue
            label="Min"
            value={`${main.temp_min} degrees`} />
          <LabelAndValue
            label="Max"
            value={`${main.temp_max} degrees`} />
          <LabelAndValue
            label="Pressure"
            value={`${main.pressure}hPa`} />
          <LabelAndValue
            label="Humidity"
            value={`${main.humidity}%`} />
        </div>
        <div className="column">
          <div>
            <h4>Clouds and Visiblity</h4>
          </div>
          <LabelAndValue
            label="Cloud Percentage"
            value={`${other.clouds.all}%`} />
          <LabelAndValue
            label="Visibility"
            value={`${other.visibility} meters`} />
        </div>
        <div className="column">
          <div>
            <h4>Wind</h4>
          </div>
          <LabelAndValue
            label="Speed"
            value={`${other.wind.speed} miles/hr`} />
          <LabelAndValue
            label="Direction"
            value={`${other.wind.deg} degrees`} />
        </div>
        <div className="column">
          <div>
            <h4>Precipitation</h4>
          </div>
          <LabelAndValue
            label=""
            value={`${other.snow ? other.snow : 'No'} snow in the last 3 hours`} />
          <LabelAndValue
            label=""
            value={`${other.rain ? other.rain : 'No'} rain in the last 3 hours`} />
        </div>
      </div>
    </div>
  );
};

WeatherDetails.propTypes = {
  main: PropTypes.object,
  weather: PropTypes.object,
  other: PropTypes.object
};

const WeatherInfo = ({onRemove, weatherInfo}) => {
  const weather = weatherInfo.data ? weatherInfo.data.weather[0] : null;
  const main = weatherInfo.data ? weatherInfo.data.main : null;
  const other = weatherInfo.data ? {
    clouds: weatherInfo.data.clouds,
    visibility: weatherInfo.data.visibility,
    wind: weatherInfo.data.wind,
    snow: weatherInfo.data.snow,
    rain: weatherInfo.data.rain
  } : null;
  return (
    <div className="weather-info" style={{marginBottom: '2em'}}>
      <div>
        <button onClick={onRemove}>Remove</button>
      </div>
      <ErrorInfo
        error={weatherInfo.error} />
      <WeatherDetails
        weather={weather}
        main={main}
        other={other} />
    </div>
  );
};

WeatherInfo.propTypes = {
  weatherInfo: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default WeatherInfo;
