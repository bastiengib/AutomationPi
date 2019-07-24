'use strict';
/* 
 * Constructeur
 */
function AuthDao () {
    this.db = new (require('./db.dao'))();
    this.table = 'oauth2_token';
}

AuthDao.prototype.createAuth = function (id, token, date, command) {
    var object = {
        oat_id: id,
        oat_token: token,
        oat_date: date,
        oat_command: command
    };
    return this.db.insert(this.table, object)
    .then(f => {
        return object;
    }).catch(e => {
        return false
    });
}

AuthDao.prototype.deleteOldAuth = function () {
    return false;
}

// on exporte en tant que constructeur pour le paramètre
module.exports = AuthDao;