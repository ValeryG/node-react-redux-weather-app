import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import HomePresentation from './HomePresentation';

import * as weatherInfoActions from '../actions/weatherInfo';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchWeatherForCity('Seattle').then(null, error => {
      this.setState({
        error: error.response.body
      });
    });
    this.state = {};
  }
  render() {
    return (
      <div>
        <HomePresentation
          weatherByCity={this.props.weatherByCity} />
        <div>
          {this.state.error && JSON.stringify(this.state.error)}
        </div>
      </div>
    );
  }
};

HomeContainer.propTypes = {
  weatherByCity: PropTypes.object.isRequired,
  fetchWeatherForCity: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    weatherByCity: state.weatherByCity
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
