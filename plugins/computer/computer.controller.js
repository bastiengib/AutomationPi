'use strict';

/* 
 * Constructeur
 */
function Computer () {
    this.wol = require('node-wol');
    this.exec = require('child_process').exec;
    this.config = require('./computer.config');
    this.authHelper = new (require('./../auth/auth.helper'))();
}

Computer.prototype.powerOn = function (id, token) {
    // controle du token
    if (!this.authHelper.checkToken(id, token, 'PC/POWER/ON')) {
        return {status: "unauthorized"}
    }
    console.log('[AutomationPi]: Power On Computer');
    this.wol.wake('D4:3D:7E:E4:E3:DC', {
        adress: '192.168.1.255',
        port: 9
    }, function(error) {
        if(error) {
            console.log('[AutomationPi]: wol:'+error);
        }
    });
    return {status: "power on"};
}

Computer.prototype.powerOff = function(id, token) {
    // controle du token
    if (!this.authHelper.checkToken(id, token, 'PC/POWER/OFF')) {
        return {status: "unauthorized"}
    }
    console.log('[AutomationPi]: Power Off Computer');
    this.exec("net rpc shutdown -t 0 -C 'AutomotionPi : arrêt du système à distance demandé' "+this.config, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('[AutomationPi]: shutdown:' + error);
        }
    });
    return {status: "power off"};
}

// on exporte en tant que constructeur pour le paramètre
module.exports = Computer;