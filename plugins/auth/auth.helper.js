'use strict';
var Dao = require('./../db/db.auth.dao');

/* 
 * Constructeur
 */
function AuthHelper () {
    this.connection = new Dao();
}

AuthHelper.prototype.makeToken = function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

AuthHelper.prototype.saveToken = function(id, token, date, command) {
    // delete old token
    this.connection.deleteOldAuth();
    return this.connection.createAuth(id, token, date, command);
}

AuthHelper.prototype.checkToken = function(id, token, cmd) {
    this.connection.deleteOldAuth();
    return false;
}

// on exporte en tant que constructeur pour le paramètre
module.exports = AuthHelper;