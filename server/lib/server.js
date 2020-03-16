const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
const indexRouter = require('../routes/api');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', indexRouter);

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
 * Listen on provided port, on all network interfaces.
 */
const serverListener = server.listen(port);

server.on('error', onError);
// /*
// * Creating Mongodb connection
// */
const hostname = process.env.MONGODB_HOST ? process.env.MONGODB_HOST : 'localhost';
const portnumber = process.env.MONGODB_PORT
  ? process.env.MONGODB_PORT
  : '27017';
console.log(`${hostname}   ${portnumber}`);
mongoose
  .connect(`mongodb://${hostname}:${portnumber}/InLooped`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

module.exports = { mongoose, serverListener };
