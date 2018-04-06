import React from 'react';
import PropTypes from 'prop-types';

const ICON_BASE_URL = 'http://openweathermap.org/img/w/';

const Header = ({children, city}) => {
  return (
    <div className="header">
      <div><h1>{city}</h1></div>
      {children}
    </div>
  );
};

Header.propTypes = {
  city: PropTypes.string.isRequired,
  children: PropTypes.node
};

const LabelAndValue = ({label, value}) => {
  return (
    <div className="label-container">
      <label>{label}</label><span>{value}</span>
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
  let errorMessage = error.response.body ? error.response.body.message
    : 'Unknown error occurred. Please try again later';
  return (
    <div className="container">
      <h2>Oops! Error has occurred</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

ErrorInfo.propTypes = {
  error: PropTypes.object
};

const WeatherDetails = ({weather, main, other, city}) => {
  return (
    <div>
      <Header
        city={city}>
        <div className="weather-icon-container">
          <img src={`${ICON_BASE_URL}${weather.icon}.png`} />
          <h2>{weather.description} - {main.temp} degrees</h2>
        </div>
      </Header>
      <div className="main">
        <div className="row">
          <div className="column">
            <div>
              <h4>Stats</h4>
            </div>
            <div className="details">
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
          </div>
          <div className="column">
            <div>
              <h4>Clouds and Visiblity</h4>
            </div>
            <div className="details">
              <LabelAndValue
                label="Cloud Percentage"
                value={`${other.clouds.all}%`} />
              <LabelAndValue
                label="Visibility"
                value={`${other.visibility} meters`} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div>
              <h4>Wind</h4>
            </div>
            <div className="details">
              <LabelAndValue
                label="Speed"
                value={`${other.wind.speed} miles/hr`} />
              {other.wind.deg && <LabelAndValue
                label="Direction"
                value={`${other.wind.deg} degrees`} />}
            </div>
          </div>
          <div className="column">
            <div>
              <h4>Precipitation</h4>
            </div>
            <div className="details">
              <div>
                {other.snow ? other.snow['3h'] : 'No'} snow in the last 3 hours
              </div>
              <div>
                {other.rain ? other.rain['3h'] : 'No'} rain in the last 3 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WeatherDetails.propTypes = {
  main: PropTypes.object,
  weather: PropTypes.object,
  other: PropTypes.object,
  city: PropTypes.string.isRequired
};

const WeatherInfo = ({city, weatherInfo}) => {
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
    <div className="weather-info">
      <ErrorInfo
        error={weatherInfo.error} />
      {!weatherInfo.error && <WeatherDetails
        weather={weather}
        main={main}
        other={other}
        city={city} />}
    </div>
  );
};

WeatherInfo.propTypes = {
  weatherInfo: PropTypes.object.isRequired,
  city: PropTypes.string.isRequired
};

export default WeatherInfo;
