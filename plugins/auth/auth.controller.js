'use strict';
var wreck = require('wreck');
var Helper = require('./auth.helper');
var Dao = require('./../db/db.auth.dao');

/* 
 * Constructeur
 */
function Auth () {
    this.wreck = wreck;
    this.helper = new Helper();
    this.connection = new Dao();
}

Auth.prototype.getIftttAuth = function (command) {
    // generation d'un token
    var token = this.helper.makeid(10);
    var date = new Date();
    //sauvegarde en base du token
    var result = this.connection.createAuth(token, date, command);
    // appel rest a ifttt en réponse

    // flush des tokens
    return result;
}

// on exporte en tant que constructeur pour le paramètre
module.exports = Auth;