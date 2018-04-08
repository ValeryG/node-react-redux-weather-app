import React from 'react';
import PropTypes from 'prop-types';

const ICON_BASE_URL = 'http://openweathermap.org/img/w/';

const LabelAndValue = ({label, value}) => {
  if (value === null || value === undefined) {
    return null;
  }
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

const Column = ({heading, values}) => {
  return (
    <div className="column">
      <div>
        <h4>{heading}</h4>
      </div>
      <div className="details">
        {Object.keys(values).map(key => {
          return <LabelAndValue key={key} label={key} value={values[key]} />;
        })}
      </div>
    </div>
  );
};

Column.propTypes = {
  heading: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired
};

const WeatherInfo = ({city, weatherInfo}) => {
  const weather = weatherInfo.weather[0];
  const main = weatherInfo.main;
  const wind = weatherInfo.wind;
  return (
    <div className="weather-info">
      <div className="weather-icon-container">
        <img src={`${ICON_BASE_URL}${weather.icon}.png`} />
        <h2>{weather.description} - {main.temp}&deg;F</h2>
      </div>
      <div className="main">
        <div className="row">
          <Column
            heading="Stats"
            values={{
              Min: `${main.temp_min}\u00B0F`,
              Max: `${main.temp_max}\u00B0F`,
              Pressure: `${main.pressure}hPa`,
              Humidity: `${main.humidity}%`
            }} />
          <Column
            heading="Clouds and Visiblity"
            values={{
              'Cloud Percentage': `${weatherInfo.clouds.all}%`,
              Visibility: `${weatherInfo.visibility} meters`
            }} />
        </div>
        <div className="row">
          <Column
            heading="Wind"
            values={{
              Speed: `${wind.speed} miles/hr`,
              Direction: `${wind.deg} degrees`
            }} />
          <div className="column">
            <div>
              <h4>Precipitation</h4>
            </div>
            <div className="details">
              <div>
                {weatherInfo.snow ? `other.snow['3h'] snow in the last 3 hours` : 'Sorry, no snow data available for city'}
              </div>
              <div>
                {weatherInfo.rain ? `other.rain['3h'] rain in the last 3 hours` : 'Sorry, no rain data available for city'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WeatherInfo.propTypes = {
  weatherInfo: PropTypes.object.isRequired,
  city: PropTypes.string.isRequired
};

export default WeatherInfo;
