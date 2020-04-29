const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path')
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../../build/')))
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

console.log("Starting app on port " + port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const io = require('socket.io')(server);

var socketUserIDMap = {}
var userSocketIDMap = {}
console.log("Server.js instantiated")
io.on('connection', socket => {
  socket.on('disconnect', reason => {
    delete userSocketIDMap[socketUserIDMap[socket.id]]
    delete socketUserIDMap[socket.id]
  });

  socket.emit('reloadComponent',{ description: "hello" });

  socket.on('storeUserID',function(data){
      delete socketUserIDMap[userSocketIDMap[data.userID]]
      socketUserIDMap[socket.id] =  data.userID
      userSocketIDMap[data.userID] = socket.id
  })
})

const sendMessageToClient = (userID) => {

  io.sockets.to(userSocketIDMap[userID]).emit('reloadComponent')
}
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

const mongodbLink = process.env.ENVIROMENT === "prod" ? process.env.MONGODB_LINK : (`mongodb://${hostname}:${portnumber}`);

mongoose
  .connect(`${mongodbLink}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error(err));

// eslint-disable-next-line max-len
module.exports = { mongoose, serverListener, sendMessageToClient};
