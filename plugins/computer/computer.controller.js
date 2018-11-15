'use strict';

/* 
 * Constructeur
 */
function Computer () {
    this.wol = require('node-wol');
    this.exec = require('child_process').exec;
    this.config = require('./computer.config');
}

Computer.prototype.powerOn = function () {
    console.log('[AutomationPi]: Power On Computer');
    this.wol.wake('D4:3D:7E:E4:E3:DC', {
        adress: '192.168.1.255',
        port: 9
    }, function(error) {
        if(error) {
            console.log('[AutomationPi]: wol:'+error);
        }
    });
    return "on";
}

Computer.prototype.powerOff = function() {
    console.log('[AutomationPi]: Power Off Computer');
    this.exec("net rpc shutdown -t 0 -C 'AutomotionPi : arrêt du système à distance demandé' "+this.config, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('[AutomationPi]: shutdown:' + error);
        }
    });
    return "off";
}

// on exporte en tant que constructeur pour le paramètre
module.exports = Computer;