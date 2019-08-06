'use strict';

/* 
 * Constructeur
 */
function Ifttt () {
    this.config = require('./ifttt.config');
}

Ifttt.prototype.getUrl = function (command) {
    return this.config.base+command+this.config.key;
}

// on exporte en tant que constructeur pour le paramètre
module.exports = Ifttt;