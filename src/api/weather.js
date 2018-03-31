const weather = {
  coord: {
    lon: -0.13,
    lat: 51.51
  },
  weather: [
    { id: 301, main: 'Drizzle', description: 'drizzle', icon: '09n' }
  ],
  base: 'stations',
  main: {
    temp: 277.14,
    pressure: 993,
    humidity: 80,
    temp_min: 276.15,
    temp_max: 278.15
  },
  visibility: 10000,
  wind: {
    speed: 3.1,
    deg: 210
  },
  clouds: {
    all: 90
  },
  dt: 1522464600,
  sys: {
    type: 1,
    id: 5091,
    message: 0.0055,
    country: 'GB',
    sunrise: 1522474687,
    sunset: 1522521131
  },
  id: 2643743,
  name: 'London',
  cod: 200
}

export function getWeatherForCity(city) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(weather);
    }, 1000);
  })
}
