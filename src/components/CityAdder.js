import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as CitiesActions from '../actions/cities';

class CityAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
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
    this.props.addCity(this.state.city);
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
      dispatch(CitiesActions.add(city));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityAdder);
