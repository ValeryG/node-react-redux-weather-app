const WeatherProvider = require('../../services/WeatherProvider');

module.exports.get = function(req, res) {
  WeatherProvider.getForCity(req.params.name).then(
    response => {
      res.status(200).json(response);
    },
    error => {
      if (error.status === 404) {
        res.status(404).json({
          message: error.response.body.message
        });
      } else {
        res.status(500).json({
          message: 'Error making request for weather info. Please try again later'
        });
      }
    }
  );
};
