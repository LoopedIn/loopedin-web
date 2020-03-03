'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const debug = require('debug')('homework1-server');
const http = require('http');
const mongoose = require('mongoose')
const app = express();
app.use(cors());
const indexRouter = require('../routes/api');
const loginTestsRouter = require('../routes/login_test');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.use('/login/', loginTestsRouter);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use("/", indexRouter);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */


server.on('error', onError);
server.on('listening', onListening);
// /*
// * Creating Mongodb connection
// */
mongoose.connect('mongodb://localhost/InLooped', { useNewUrlParser: true,useUnifiedTopology: true  })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


module.exports = {server,mongoose};
