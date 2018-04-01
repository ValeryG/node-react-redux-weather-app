import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CityContainer from './CityContainer';
import CityList from './CityList';

import * as weatherInfoActions from '../actions/weatherInfo';

class HomeContainer extends React.Component {
  componentWillMount() {
    this.props.fetchWeatherForCity('Seattle');
    this.props.fetchWeatherForCity('Minneapolis');
  }
  render() {
    return (
      <div className="home">
        <CityList />
        <div className="cities">
          {this.props.cities.map(city => {
            return <CityContainer city={city} key={city} />;
          })}
        </div>
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
      return dispatch(weatherInfoActions.addAndFetchForCityIfNecessary(city));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
