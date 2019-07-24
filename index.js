'use strict';

var Hapi = require('hapi');
var server = Hapi.server({
    port: 21000,
    host: '127.0.0.1'
});
//var WebSocket = require('./plugins/pushbullet/pushbullet.controller');
//var Computer = require('./plugins/computer/computer.route');
//var Sms = require('./plugins/sms/sms.route');
var Auth = require('./plugins/auth/auth.route');
//server.route(new Computer());
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