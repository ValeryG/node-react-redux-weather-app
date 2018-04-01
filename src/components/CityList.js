import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CityAdder from './CityAdder';

import {select as selectCity, remove as removeCity} from '../actions/cities';

const CityList = ({cities, selectCity, removeCity}) => {
  return (
    <div className="city-list">
      <CityAdder />
      <ul>
        {cities.map(city => {
          return (
            <li key={city}>
              <button onClick={function() { selectCity(city); }}>
                {city}
              </button>
              <button className="remove" onClick={function() { removeCity(city); }}>X</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

CityList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectCity: PropTypes.func.isRequired,
  removeCity: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    cities: state.cities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectCity: function(city) {
      dispatch(selectCity(city));
    },
    removeCity: function(city) {
      dispatch(removeCity(city));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
