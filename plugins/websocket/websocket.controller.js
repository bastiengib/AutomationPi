const config = require('../../server.config');
const WebSocketServer = require('websocket').server;
const http = require('http');

var server = http.createServer((request, response) => {}).listen(config.WS_PORT, config.IP);

// create the server
var wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', (request) => {
  var connection = request.accept(null, request.origin);
  console.log('new user connected');
  
  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', (message) => {
    console.log(message)
  });

  connection.on('close', (connection) => {
    // close user connection
  });
});

module.exports = wsServer;