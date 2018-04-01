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
    const selected = this.props.selectedCity;
    return (
      <div className="home">
        <CityList />
        <div className="city">
          {selected && <CityContainer city={selected} />}
        </div>
      </div>
    );
  }
};

HomeContainer.propTypes = {
  weatherByCity: PropTypes.object.isRequired,
  fetchWeatherForCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCity: PropTypes.string
};

function mapStateToProps(state) {
  return {
    weatherByCity: state.weatherByCity,
    cities: state.cities,
    selectedCity: state.selectedCity
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
