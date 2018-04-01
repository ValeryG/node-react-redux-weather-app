import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import WeatherInfo from './WeatherInfo';
import CityAdder from './CityAdder';

import * as weatherInfoActions from '../actions/weatherInfo';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const promises = props.cities.map(city => {
      return this.props.fetchWeatherForCity(city);
    });
    // TODO handle error per city
    Promise.all(promises).then(null, error => {
      this.setState({
        error: error.response.body
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cities.length > this.props.cities.length) {
      this.props.fetchWeatherForCity(nextProps.cities[nextProps.cities.length - 1]);
    }
  }
  render() {
    return (
      <div>
        {this.props.cities.map(city => {
          return <WeatherInfo city={city} key={city} />;
        })}
        <div>
          {this.state.error && JSON.stringify(this.state.error)}
        </div>
        <CityAdder />
      </div>
    );
  }
};

HomeContainer.propTypes = {
  weatherByCity: PropTypes.object.isRequired,
  fetchWeatherForCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired
};

function mapStateToProps(state) {
  return {
    weatherByCity: state.weatherByCity,
    cities: state.cities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWeatherForCity: function(city) {
      return dispatch(weatherInfoActions.fetchForCity(city));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
