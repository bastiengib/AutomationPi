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
        oat_date: date.toUTCString(),
        oat_command: command
    };
    return this.db.insert(this.table, object)
    .then(f => {
        return object;
    }).catch(e => {
        return false
    });
}

AuthDao.prototype.deleteOldAuth = async function () {
    var t = new Date(Date.now() - 20000);

    return this.db.accessor(this.table)
        .where('oat_date', '<', t.toUTCString())
        .del()
        .then(f => {
            return f;
        }).catch(e => {
            return false;
        });
}

AuthDao.prototype.queryAuth = function (id, token, cmd) {
    return this.db.accessor(this.table)
        .where('oat_id', id)
        .where('oat_token', token)
        .where('oat_command', cmd)
        .then(f => {
            return f;
        }).catch(e => {
            return [];
        });
}

// on exporte en tant que constructeur pour le paramètre
module.exports = AuthDao;