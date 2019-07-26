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

AuthHelper.prototype.saveToken = async function(id, token, date, command) {
    // delete old token
    await this.connection.deleteOldAuth();
    return await this.connection.createAuth(id, token, date, command);
}

AuthHelper.prototype.checkToken = async function(id, token, cmd) {
    await this.connection.deleteOldAuth();
    var token = await this.connection.queryAuth(id, token, cmd);
    return token.length > 0
}

// on exporte en tant que constructeur pour le paramètre
module.exports = AuthHelper;