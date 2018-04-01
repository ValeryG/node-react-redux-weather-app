import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addAndFetchForCityIfNecessary} from '../actions/weatherInfo';

class CityAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}/>
        </form>
        {this.state.error && <div>
          {this.state.error}
        </div>}
      </div>
    );
  }
  onChange(event) {
    this.setState({
      city: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.props.cities.includes(this.state.city.toUpperCase())) {
      this.setState({
        error: `${this.state.city} has already been added`
      });
    } else {
      this.props.addCity(this.state.city);
    }
  }
};

CityAdder.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  addCity: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    cities: state.cities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCity: function(city) {
      dispatch(addAndFetchForCityIfNecessary(city));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityAdder);