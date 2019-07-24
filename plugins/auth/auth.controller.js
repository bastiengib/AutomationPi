'use strict';
var wreck = require('wreck');
var Helper = require('./auth.helper');
var Ifttt = require('./../ifttt/ifttt.controller');

/* 
 * Constructeur
 */
function Auth () {
    this.wreck = wreck;
    this.helper = new Helper();
    this.ifttt = new Ifttt();
}

Auth.prototype.getAuth = async function (command, id) {
    // generation d'un token
    var token = this.helper.makeToken(10);
    var date = new Date();
    //sauvegarde en base du token
    var result = await this.helper.saveToken(id, token, date, command);
    // appel rest a ifttt en réponse
    var payload = { "value1": result.oat_token, "value2": result.oat_command };
    result = await this.wreck.post(this.ifttt.getUrl('auth'), { payload: payload })
    .then(res => { return true; })
    .catch(err => { return false; });
    ;
    // flush des tokens
    return result;
}

// on exporte en tant que constructeur pour le paramètre
module.exports = Auth;