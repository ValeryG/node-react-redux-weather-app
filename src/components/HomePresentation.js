import React from 'react';
import PropTypes from 'prop-types';

const HomePresentation = ({weatherByCity}) => {
  return (
    <div>
      {Object.keys(weatherByCity).map(key => {
        return (
          <div key={key}>
            <div>
              <p>
                This is the weather for {key}
              </p>
            </div>
            <p>
              {JSON.stringify(weatherByCity[key])}
            </p>
          </div>
        );
      })}
    </div>
  );
};

HomePresentation.propTypes = {
  weatherByCity: PropTypes.object.isRequired
};

export default HomePresentation;
