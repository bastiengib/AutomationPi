'use strict';

/* 
 * Constructeur
 */
function AuthHelper () {
}

AuthHelper.prototype.makeid = function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// on exporte en tant que constructeur pour le paramètre
module.exports = AuthHelper;