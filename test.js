const api = require('./app/api');
const provider = require('./app/services/weatherProvider');

const CITY = 'london';

provider.getWeatherForCity(CITY).then(
  res => {
    console.log(res);
    provider.getWeatherForCity(CITY).then(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  },
  error => {
    // console.log(error);
    console.log(error.response.body);
  }
);
