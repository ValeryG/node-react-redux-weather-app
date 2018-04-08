# Weather app assignment using React
App demo of NodeJS, ExpressJS, React, and Redux.

# Heroku hosting
https://takeru-weather-app.herokuapp.com/

# CI Status
[![Build Status](https://travis-ci.org/tkomiya24/node-react-redux-weather-app.svg?branch=master)](https://travis-ci.org/tkomiya24/node-react-redux-weather-app)

# Code coverage
[![Coverage Status](https://coveralls.io/repos/github/tkomiya24/node-react-redux-weather-app/badge.svg?branch=master)](https://coveralls.io/github/tkomiya24/node-react-redux-weather-app?branch=master)

## Installation
### Prereqs
  1. Git
  2. [nvm](https://github.com/creationix/nvm)

### Steps
  1. Clone repo
  2. Install NodeJS with NVM via the command `nvm install`
  3. Install dependencies with `npm install`
  4. Set environment variables `NODE_ENV=development` and `WEATHER_API_KEY=${yourApiKey}`
  5. Run with `node index.js`

## Development

Front-end assets are built with Webpack. Run the command `npm run watch` to startup the Webpack watch job, which will rebuild the front end assets on each save and dump them into the dist/ folder from which they are served. The watch command will build

  1. SCSS from src/styles/ and put them into the front end bundle in development. It will create a CSS file in production mode (NODE_ENV=production)
  2. ES5 JavaScript from dependencies and ES6 sources via Babel. It will not build React or ReactDOM in production and those will instead be pulled from a CDN.
  3. an index.html file via the HtmlWebpackPlugin. It will decide on which bundle and which sources it needs depending on the NODE_ENV value.

The entry point for the front-end is src/app.js

The back end entry point is index.js. There is only one route which retrieves the weather information from the OpenWeather API and caches them for 10 minutes due to [API limitations](https://openweathermap.org/appid#work). Whenever there is cached data for a city, the API will not be called.
