'use strict';
/* 
 * Constructeur
 */
function AuthDao () {
    this.connection = new (require('./db.dao'))(); 
}

// on exporte en tant que constructeur pour le paramètre
module.exports = AuthDao;