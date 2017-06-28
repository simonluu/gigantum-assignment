import axios from 'axios';

// action constant
export const RETRIEVE_WEATHER = 'RETRIEVE_WEATHER';

// action that calls the proxy server's getWeather.
export function retrieveWeather() {
  const request = axios.get('/getWeather');

  // sends the weather object through middlewares then to reducers.
  return {
    type: RETRIEVE_WEATHER,
    payload: request,
  }
}