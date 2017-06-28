const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// sets up the proxy server for calling the weather api.
const app = express();

const router = require('./config/router');

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', '..', 'build')));

router(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'));
});


// Server Setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on:', port);
