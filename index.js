'use strict';

var Hapi = require('hapi');
var config = require("./server.config");
var server = Hapi.server({
    port: config.PORT,
    host: config.IP
});
//var WebSocket = require('./plugins/pushbullet/pushbullet.controller');
var webSocket = require('./plugins/websocket/websocket.controller');
var Computer = require('./plugins/computer/computer.route');
//var Sms = require('./plugins/sms/sms.route');
var Auth = require('./plugins/auth/auth.route');

server.route(new Computer());
//server.route(new Sms());
server.route(new Auth());

var init = async () => {

    await server.start();

    //var push = new WebSocket(server);

    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();