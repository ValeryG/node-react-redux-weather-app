import React from 'react';
import PropTypes from 'prop-types';

const ErrorWidget = ({error}) => {
  if (!error) {
    return null;
  }
  let errorMessage = error.response.body ? error.response.body.message
    : 'Unknown error occurred. Please try again later';
  return (
    <div className="container">
      <h2>Oops! Error has occurred</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

ErrorWidget.propTypes = {
  error: PropTypes.object
};

export default ErrorWidget;
