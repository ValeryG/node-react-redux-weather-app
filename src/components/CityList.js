import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CityAdder from './CityAdder';

const CityList = ({cities}) => {
  return (
    <div className="city-list">
      <CityAdder />
      <ul>
        {cities.map(city => {
          return (
            <li key={city}>
              {city}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

CityList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired
};

function mapStateToProps(state) {
  return {
    cities: state.cities
  };
}

export default connect(mapStateToProps)(CityList);
