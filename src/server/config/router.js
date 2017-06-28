const axios = require('axios');

const darksky_api = 'ENTER YOUR DARK SKY API HERE';

module.exports = (app) => {
  // proxy server's getWeather that calls the darksky api to obtain the weather.
  // returns the response data.
  app.get('/getWeather', (req, res) => {
    axios.get(`https://api.darksky.net/forecast/${darksky_api}/38.9072,-77.0369`)
      .then(response => {
        return res.status(200).send(response.data);
      })
      .catch(error => {
        return res.status(400).send({ error: 'There was an error retrieving the weather' });
      })
  })
}