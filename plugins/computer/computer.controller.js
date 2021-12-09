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

Computer.prototype.powerOn = async function (id, token) {
    // controle du token
    if (!(await this.authHelper.checkToken(id, token, 'PC/POWER/ON'))) {
        return {
            status: "token not found or not longer available",
            code: 401
        };
    }
    console.log('[AutomationPi]: Power On Computer');
    this.wol.wake(this.config.on_params.mac, {
        adress: this.config.on_params.address,
        port: this.config.on_params.port
    }, function(error) {
        if(error) {
            console.log('[AutomationPi]: wol:'+error);
        }
    });
    return { status: "power on", code: 200 };
}

Computer.prototype.powerOff = async function(id, token) {
    // controle du token
    if (!(await this.authHelper.checkToken(id, token, 'PC/POWER/OFF'))) {
        return { status: "token not found or not longer available", code: 401 };
    }
    console.log('[AutomationPi]: Power Off Computer');
    this.exec("net rpc shutdown -t 0 -C 'AutomotionPi : arrêt du système à distance demandé' "+this.config.off_params, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('[AutomationPi]: shutdown:' + error);
          return {status: "s", code: 200 };
        }
    });
    return {status: "power off", code: 200 };
}

// on exporte en tant que constructeur pour le paramètre
module.exports = Computer;