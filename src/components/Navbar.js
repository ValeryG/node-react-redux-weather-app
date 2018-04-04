import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as SidebarActions from '../actions/sidebar';
import CityAdder from './CityAdder';

const Navbar = ({toggleSidebar}) => {
  return (
    <nav>
      <div className="icon-container">
        <button onClick={toggleSidebar}>
          <i className="material-icons">menu</i>
        </button>
      </div>
      <div className="adder-container">
        <CityAdder />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: function() {
      dispatch(SidebarActions.toggle());
    }
  };
}

export default connect(null, mapDispatchToProps)(Navbar);
